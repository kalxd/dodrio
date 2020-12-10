use actix_web::{post, web::Json, Scope};
use serde::{Deserialize, Serialize};

use crate::error::{Error, Res};

#[derive(Deserialize, Serialize)]
struct SignupBody {
	account: String,
	password: String,
	repassword: String,
	username: Option<String>,
	email: String,
}

#[post("/signup")]
async fn signup_api(body: Json<SignupBody>) -> Res<Json<SignupBody>> {
	if body.password != body.repassword {
		return Err(Error::BadRequestE("两次密码不一致。".into()));
	}

	Ok(body)
}

pub(super) fn build() -> Scope {
	Scope::new("/user").service(signup_api)
}
