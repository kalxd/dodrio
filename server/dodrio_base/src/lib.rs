use serde::Serialize;
use tokio_postgres::row::Row;

/// 最为普通的用户。
/// 可描述用户的最小单位。
#[derive(Serialize)]
pub struct User {
	pub id: u32,
	pub account: String,
	pub username: String,
}

impl From<Row> for User {
	fn from(row: Row) -> Self {
		let id = row.get("id");
		let account = row.get("账号");
		let username = row.get("用户名");

		Self { id, account, username }
	}
}

/// 看起来像用户、走起来像用户、听起来像用户，
/// 那他就是用户。
pub trait IsUser {
	fn get_id(&self) -> &u32;
	fn get_account(&self) -> &str;
	fn get_username(&self) -> &str;
}

impl<T> From<&T> for User
where
	T: IsUser,
{
	fn from(v: &T) -> Self {
		let id = v.get_id().clone();
		let account = v.get_account().into();
		let username = v.get_username().into();

		Self { id, account, username }
	}
}
