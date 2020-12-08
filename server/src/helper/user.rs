use anyhow::{ensure, Result};
use tokio_postgres::types::ToSql;

use super::db::DB;
use dodrio_base::User;

#[derive(Clone)]
pub struct State(DB);

impl From<DB> for State {
	fn from(db: DB) -> Self {
		Self(db)
	}
}

impl State {
	pub async fn create_user(
		&self,
		account: &str,
		password: &str,
		username: Option<&str>,
		email: &str,
	) -> Result<User> {
		/*
				let is_exist: bool = self
					.0
					.query(
						r#"select exists (select count(*) from 用户 where 账号 = $1"#,
						&[&account],
					)
					.await?;

				ensure!(is_exist, "用户已存在");

		self.0
			.query_one(
				r#"insert into 用户 (账号, 密码, 用户名, 电子邮件) values ($1, md5($2), $3, $4)"#,
				&[&account, &password, &username, &email],
			)
			.await
		 */
		unimplemented!()
	}
}
