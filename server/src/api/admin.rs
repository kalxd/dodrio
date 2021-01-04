//! 后台管理API。
use actix_web::{get, Scope};

#[get("/hello")]
async fn index() -> &'static str {
	"hello admin"
}

pub(super) fn api() -> Scope {
	Scope::new("/admin").service(index)
}
