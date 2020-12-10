use actix_web::{
	post,
	web::{Data, Json},
	Scope,
};
use dodrio_base::User;
use serde::{Deserialize, Serialize};

use crate::error::{Error, Res};
use crate::state::State;

#[derive(Deserialize, Serialize)]
struct SignupBody {
	account: String,
	password: String,
	repassword: String,
	username: Option<String>,
	email: String,
}

#[post("/signup")]
async fn signup_api(body: Json<SignupBody>, state: Data<State>) -> Res<Json<User>> {
	if body.password != body.repassword {
		return Err(Error::BadRequestE("两次密码不一致。".into()));
	}

	state
		.user
		.create_user(&body.account, &body.password, body.username.as_deref(), &body.email)
		.await
		.map(Json)
}

pub(super) fn build() -> Scope {
	Scope::new("/user").service(signup_api)
}
