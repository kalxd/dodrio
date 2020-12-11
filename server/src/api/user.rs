use actix_web::{
	get, post,
	web::{Data, Json},
	Scope,
};
use dodrio_base::User;
use serde::{Deserialize, Serialize};

use std::convert::TryInto;

use crate::bad_request;
use crate::error::{Error, Res};
use crate::state::State;
use crate::t::{mics::SaveForUser, SessionUser};

#[derive(Deserialize, Serialize)]
struct SignupBody {
	account: String,
	password: String,
	repassword: String,
	username: Option<String>,
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
async fn signup_api(body: Json<SignupBody>, state: Data<State>) -> Res<Json<User>> {
	let input: (&str, &SignupBody) = (state.conf.salt.as_ref(), &*body);
	let save_data: SaveForUser = TryInto::try_into(&input)?;
	state.user.create_user(&save_data).await.map(Json)
}

#[get("/test")]
async fn test(user: SessionUser) -> String {
	user.account.into()
}

pub(super) fn build() -> Scope {
	Scope::new("/user").service(signup_api).service(test)
}
