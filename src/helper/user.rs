use super::db::{InnerErrorTransfer, DB};
use dodrio_base::IsUser;

use std::convert::TryFrom;

use crate::error::{CatchErr, Error, Res, Throwable};
use crate::t::{
	mics::{SaveForUser, SessionSid, SessionWith},
	Me,
};

#[derive(Clone)]
pub struct State(DB);

impl From<DB> for State {
	fn from(db: DB) -> Self {
		Self(db)
	}
}

impl State {
	/// 注册一个用户，并写入登录信息。
	pub async fn signup(&self, data: &SaveForUser<'_>) -> Res<SessionWith<Me>> {
		let mut client = self.0.get().await?;
		let transaction = client.transaction().await?;
		let user: Res<SessionWith<Me>> = async {
			// 添加用户
			let me: Me = transaction
				.query_opt(
					include_str!("../sql/user_create_user.sql"),
					&[&data.account, &data.password, &data.username, &data.email, &data.salt],
				)
				.await
				.catch_db_dup()?
				.map(Me::try_from)
				.transpose()?
				.throw_msg("注册用户失败！")?;

			// 添加登录信息。
			let sid: SessionSid = transaction
				.query_opt(include_str!("../sql/user_login.sql"), &[&data.account, &me.id])
				.await?
				.map(SessionSid::try_from)
				.transpose()?
				.throw_msg("登录失败！")?;

			Ok(SessionWith { sid, data: me })
		}
		.await
		.map_err(|e| match e {
			Error::CatchE(CatchErr::DBDuplicate) => Error::BadRequestE("该用户已被注册！".into()),
			_ => e,
		});

		if user.is_err() {
			transaction.rollback().await?;
		}

		return user;
	}

	/// 验证用户，并返回全部信息。
	pub async fn auth(&self, account: &str, password: &str, salt: &str) -> Res<Option<Me>> {
		self.0
			.query_one(
				r#"select * from 用户 where 账号 = $1 and 密码 = md5($2 || $3) limit 1"#,
				&[&account, &password, &salt],
			)
			.await
	}

	/// 用户登录，并将信息写入“会话”。
	pub async fn login<T: IsUser>(&self, user: &T) -> Res<SessionSid> {
		let user_id = user.get_id();
		let user_account = user.get_account();

		self.0
			.query_one(include_str!("../sql/user_login.sql"), &[&user_account, &user_id])
			.await?
			.throw_msg("session创建失败，用户无法登录。")
	}
}
