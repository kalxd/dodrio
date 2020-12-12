//! 必要、常用类型定义
use serde::Serialize;
use tokio_postgres::{error::Error as PGError, row::Row};

use std::convert::TryFrom;
use std::ops::Deref;

/// 该函数用于创建新用户，详见[`crate::helper::user::State::create_user`]。
pub struct SaveForUser<'a> {
	/// 用户账号。
	pub account: &'a str,
	/// 用户密码。
	pub password: &'a str,
	/// 用户名。允许置空。
	pub username: Option<&'a str>,
	/// 预留电子邮箱。
	pub email: &'a str,
	/// 密码盐。
	pub salt: &'a str,
}

impl<'a> SaveForUser<'a> {
	pub fn new(
		account: &'a impl AsRef<str>,
		password: &'a impl AsRef<str>,
		username: &'a Option<impl Deref<Target = str>>,
		email: &'a impl AsRef<str>,
		salt: &'a impl AsRef<str>,
	) -> Self {
		Self {
			account: account.as_ref(),
			password: password.as_ref(),
			username: username.as_deref(),
			email: email.as_ref(),
			salt: salt.as_ref(),
		}
	}
}

/// 单独的sid。估计仅在一处用到。
#[derive(Serialize)]
pub struct SessionSid(pub String);

impl TryFrom<Row> for SessionSid {
	type Error = PGError;

	fn try_from(row: Row) -> Result<Self, Self::Error> {
		let sid = row.try_get(0)?;

		Ok(Self(sid))
	}
}

/// 连带sid一同返回的数组结构。
///
/// 取消以往在响应头塞各种没道理数据的陋习。
#[derive(Serialize)]
pub struct SessionWith<T> {
	pub sid: SessionSid,
	pub data: T,
}
