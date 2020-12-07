//! 异常与错误。
use actix_web::ResponseError;
use serde::Serialize;

/// 错误统一格式。
#[derive(Serialize)]
struct ErrorBody<'a>(&'a str);

pub enum NotFoundE {
	User,
	Session,
}

/// 由于自身问题导致的异常。
pub enum AppException {
	/// 配置相关异常。
	ConfigE,
}
