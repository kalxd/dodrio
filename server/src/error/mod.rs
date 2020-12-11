//! 异常与错误。
use actix_web::{dev::Body, http::StatusCode, web::HttpResponse, ResponseError};
use serde_json::json;

mod catch_err;

pub use catch_err::*;

pub type Res<T> = std::result::Result<T, Error>;

/// 业务错误类型。
#[derive(Debug)]
pub enum Error {
	// 400错误
	BadRequestE(String),
	CatchE(CatchErr),
	/// 内部服务错误。
	ServerE(String),
}

impl<E> From<E> for Error
where
	E: std::error::Error,
{
	fn from(err: E) -> Self {
		let msg = format!("{}", err);
		Self::ServerE(msg)
	}
}

impl std::fmt::Display for Error {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		let msg = match self {
			Self::BadRequestE(msg) => msg,
			Self::CatchE(_) => "重复操作",
			Self::ServerE(msg) => msg,
		};

		write!(f, "内部错误：{}", msg)
	}
}

impl ResponseError for Error {
	fn status_code(&self) -> StatusCode {
		match self {
			Self::BadRequestE(_) => StatusCode::BAD_REQUEST,
			_ => StatusCode::INTERNAL_SERVER_ERROR,
		}
	}

	fn error_response(&self) -> HttpResponse<Body> {
		let msg = format!("{}", &self);
		let code = self.status_code();
		let json = json!({ "msg": msg });

		HttpResponse::build(code).json(json)
	}
}

/// 可以快速抛出对错误。
///
/// 这在对写业务速度的提升可不就是一点儿半点儿啦！
pub trait Throwable<T> {
	fn bad_request<S: Into<String>>(self, msg: S) -> Res<T>;

	fn catch_with(self, err: CatchErr) -> Res<T>;

	fn throw_msg<S: Into<String>>(self, msg: S) -> Res<T>;
}

impl<T, E> Throwable<T> for std::result::Result<T, E> {
	fn bad_request<S: Into<String>>(self, msg: S) -> Res<T> {
		self.map_err(|_| Error::BadRequestE(msg.into()))
	}

	fn catch_with(self, err: CatchErr) -> Res<T> {
		self.map_err(|_| Error::CatchE(err))
	}

	fn throw_msg<S: Into<String>>(self, msg: S) -> Res<T> {
		self.map_err(|_| Error::ServerE(msg.into()))
	}
}

impl<T> Throwable<T> for Option<T> {
	fn bad_request<S: Into<String>>(self, msg: S) -> Res<T> {
		self.ok_or(Error::BadRequestE(msg.into()))
	}

	fn catch_with(self, err: CatchErr) -> Res<T> {
		self.ok_or(Error::CatchE(err))
	}

	fn throw_msg<S: Into<String>>(self, msg: S) -> Res<T> {
		self.ok_or(Error::ServerE(msg.into()))
	}
}

/// 快速抛出错误的宏。
///
/// 该宏一定返回`Err`。
///
/// # 例子
/// ```rust
/// bad_request!(is_not_user, "用户不存在！");
/// ```
/// 当`is_not_user`为true时，抛出错误；为false时，继续往下执行。
#[macro_export]
macro_rules! bad_request {
	($b:expr, $msg:literal) => {
		if $b {
			bad_request!($msg);
			}
	};

	($msg:literal) => {
		return Err(Error::BadRequestE($msg.into()));
	};
}
