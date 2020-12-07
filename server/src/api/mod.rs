//! 整个后端API布局。
//! 所有接口都从这里定义。

use actix_web::Scope;

/// 如果支持`const`就更精彩了。
pub fn build() -> Scope {
	Scope::new("_")
}
