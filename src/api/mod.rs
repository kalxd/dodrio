//! 整个后端API布局。
//! 所有接口都从这里定义。

use actix_web::Scope;

mod admin;
mod info;
mod user;

/// 如果支持`const`就更精彩了。
pub fn api() -> Scope {
	Scope::new("/_")
		.service(info::api())
		.service(user::build())
		.service(admin::api())
}
