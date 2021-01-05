//! 后台管理API。
use actix_web::{
	post,
	web::{Data, Json},
	Scope,
};
use serde::Deserialize;

use std::ops::DerefMut;

use crate::bad_request;
use crate::error::{Error, Res};
use crate::state::State;
use crate::t::SiteInfo;

#[derive(Deserialize)]
struct RegistBody {
	#[serde(rename = "网站标题")]
	title: String,
	#[serde(rename = "网站描述")]
	desc: String,
	#[serde(rename = "用户名")]
	username: String,
	#[serde(rename = "密码")]
	password: String,
}

/// 第一次初始化时调用该接口。
#[post("/regist")]
async fn regist(state: Data<State>, body: Json<RegistBody>) -> Res<Json<SiteInfo>> {
	let mut info = state.info.lock()?;
	bad_request!(info.is_some(), "该接口已关闭！");

	state
		.admin
		.create_user(&body.username, &body.password, &state.conf.salt)
		.await?;

	let body = body.into_inner();
	let next_info = SiteInfo {
		title: body.title,
		desc: body.desc,
	};

	next_info.save()?;
	info.deref_mut().replace(next_info.clone());

	Ok(Json(next_info))
}

/// 注册新管理员。
#[post("/siginup")]
async fn sigin_up() -> &'static str {
	""
}

pub(super) fn api() -> Scope {
	Scope::new("/admin").service(regist).service(sigin_up)
}
