//! 后台业务模块。
use super::db::DB;
use crate::error::{Res, Throwable};
use crate::t::AdminUser;

#[derive(Clone)]
pub struct State(DB);

impl From<DB> for State {
	fn from(db: DB) -> Self {
		Self(db)
	}
}

impl State {
	/// 创建新管理员
	pub async fn create_user(&self, username: &str, password: &str, salt: &str) -> Res<AdminUser> {
		self.0
			.query_one(
				r#"
insert into
管理员 (用户名, 密码)
values ($1, md5($3 || $2 || $3))
returning id, 用户名, 创建日期
"#,
				&[&username, &password, &salt],
			)
			.await?
			.throw_msg("创建管理员失败！")
	}
}
