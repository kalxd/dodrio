//! 必要、常用类型定义
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
