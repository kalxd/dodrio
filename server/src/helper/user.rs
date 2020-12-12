use super::db::DB;
use dodrio_base::IsUser;

use crate::error::{Error, Res, Throwable};
use crate::t::{
	mics::{SaveForUser, SessionSid},
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
	/// 创建新用户
	pub async fn create_user(&self, data: &SaveForUser<'_>) -> Res<Me> {
		self.0
			.query_one(
				r#"insert into 用户 (账号, 密码, 用户名, 电子邮箱) values ($1, md5($2 || $5), $3, $4) returning *"#,
				&[&data.account, &data.password, &data.username, &data.email, &data.salt],
			)
			.await
			.map_err(|e| match e {
				Error::CatchE(_) => Error::BadRequestE("该账号已被注册。".into()),
				_ => e,
			})?
			.throw_msg("注册用户失败")
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

	/// 用户尝试登录，并将信息写入“会话”。
	pub async fn login<T: IsUser>(&self, user: &T) -> Res<SessionSid> {
		let user_id = user.get_id();
		let user_account = user.get_account();

		self.0
			.query_one(include_str!("../sql/user_login.sql"), &[&user_account, &user_id])
			.await?
			.throw_msg("session创建失败，用户无法登录。")
	}
}
