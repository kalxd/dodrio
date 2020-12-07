use actix_web::{post, web, Scope};
use anyhow::Result;

use crate::state::State;

#[post("/signup")]
async fn signup_api(state: web::Data<State>) -> Result<()> {
	Ok(())
}

pub(super) fn build() -> Scope {
	Scope::new("user").service(signup_api)
}
