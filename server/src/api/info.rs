//! 网站基本API。
use actix_web::{
	get,
	web::{Data, Json},
	Scope,
};

use crate::error::Res;
use crate::state::State;
use crate::t::SiteInfo;

#[get("")]
async fn site_info(state: Data<State>) -> Res<Json<Option<SiteInfo>>> {
	let info = state.info.lock()?;

	Ok(Json(info.clone()))
}

pub(super) fn api() -> Scope {
	Scope::new("/info").service(site_info)
}
