use super::db::DB;
use dodrio_base::User;

use crate::error::{Error, Res, Throwable};

#[derive(Clone)]
pub struct State(DB);

impl From<DB> for State {
	fn from(db: DB) -> Self {
		Self(db)
	}
}

impl State {
	pub async fn create_user(&self, account: &str, password: &str, username: Option<&str>, email: &str) -> Res<User> {
		self.0
			.query_one(
				r#"insert into 用户 (账号, 密码, 用户名, 电子邮箱) values ($1, $2, md5($3), $4) returning *"#,
				&[&account, &password, &username, &email],
			)
			.await
			.map_err(|e| match e {
				Error::CatchE(_) => Error::BadRequestE("该账号已被注册。".into()),
				_ => e,
			})
			.and_then(|user| user.throw_msg("用户不存在"))
	}
}
