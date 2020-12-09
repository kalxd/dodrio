//! 异常与错误。
use actix_web::{dev::Body, http::StatusCode, web::HttpResponse, ResponseError};
use serde_json::json;

pub type Res<T> = std::result::Result<T, Error>;

/// 业务错误类型。
#[derive(Debug)]
pub enum Error {
	/// 内部数据重复，常用于数据库操作。
	Duplicate,
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
			Self::Duplicate => "重复操作",
			Self::ServerE(msg) => msg,
		};

		write!(f, "内部错误：{}", msg)
	}
}

impl ResponseError for Error {
	fn status_code(&self) -> StatusCode {
		match self {
			Self::Duplicate => StatusCode::INTERNAL_SERVER_ERROR,
			Self::ServerE(_) => StatusCode::INTERNAL_SERVER_ERROR,
		}
	}

	fn error_response(&self) -> HttpResponse<Body> {
		let msg = format!("{}", &self);
		let code = self.status_code();
		let json = json!({ "msg": msg });

		HttpResponse::build(code).json(json)
	}
}
