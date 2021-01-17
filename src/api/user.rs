use actix_web::{
	get, post,
	web::{Data, Json},
	Scope,
};
use serde::Deserialize;

use std::convert::TryInto;

use crate::bad_request;
use crate::error::{Error, Res, Throwable};
use crate::state::State;
use crate::t::{
	mics::{SaveForUser, SessionWith},
	Me, SessionUser,
};

#[derive(Deserialize)]
struct SignupBody {
	#[serde(rename = "账号")]
	account: String,
	#[serde(rename = "密码")]
	password: String,
	#[serde(rename = "确认密码")]
	repassword: String,
	#[serde(rename = "用户名")]
	username: Option<String>,
	#[serde(rename = "电子邮箱")]
	email: String,
}

impl<'a> TryInto<SaveForUser<'a>> for &'a (&'a str, &'a SignupBody) {
	type Error = Error;

	fn try_into(self) -> Result<SaveForUser<'a>, Self::Error> {
		bad_request!(self.1.password != self.1.repassword, "两次密码不一致");

		Ok(SaveForUser::new(
			&self.1.account,
			&self.1.password,
			&self.1.username,
			&self.1.email,
			&self.0,
		))
	}
}

#[post("/signup")]
async fn signup_api(body: Json<SignupBody>, state: Data<State>) -> Res<Json<SessionWith<Me>>> {
	let input: (&str, &SignupBody) = (state.conf.salt.as_ref(), &*body);
	let save_data: SaveForUser = TryInto::try_into(&input)?;
	let me = state.user.create_user(&save_data).await?;
	let sid = state.user.login(&me).await?;

	let session = SessionWith { data: me, sid };
	Ok(Json(session))
}

#[derive(Deserialize)]
struct SigninBody {
	account: String,
	password: String,
}

#[post("/signin")]
async fn signin_api(body: Json<SigninBody>, state: Data<State>) -> Res<Json<SessionWith<Me>>> {
	let me = state
		.user
		.auth(&body.account, &body.password, &state.conf.salt)
		.await?
		.bad_request("用户不存在")?;
	let sid = state.user.login(&me).await?;

	let session = SessionWith { data: me, sid };

	Ok(Json(session))
}

#[get("/me")]
async fn me_api(session: Option<SessionUser>) -> Json<Option<Me>> {
	let me = session.map(Into::into);
	Json(me)
}

pub(super) fn build() -> Scope {
	Scope::new("/user")
		.service(signup_api)
		.service(signin_api)
		.service(me_api)
}
