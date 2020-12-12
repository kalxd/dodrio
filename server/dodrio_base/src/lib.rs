use tokio_postgres::{error::Error, row::Row};

use std::convert::TryFrom;

/// 最为普通的用户。
/// 可描述用户的最小单位。
pub struct User {
	pub id: i32,
	pub account: String,
}

impl TryFrom<Row> for User {
	type Error = Error;

	fn try_from(row: Row) -> Result<Self, Self::Error> {
		let id = row.try_get("id")?;
		let account = row.try_get("账号")?;

		Ok(Self { id, account })
	}
}

/// 看起来像用户、走起来像用户、听起来像用户，
/// 那他就是用户。
pub trait IsUser {
	fn get_id(&self) -> &i32;
	fn get_account(&self) -> &str;
}
