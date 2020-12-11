use actix_web::{dev::Payload, web, FromRequest, HttpRequest};
use futures::future::{FutureExt, LocalBoxFuture};
use tokio_postgres::{error::Error as PGError, row::Row};

use std::convert::TryFrom;

use crate::error::{Error, Throwable};

pub mod mics;

const TOKEN_KEY: &'static str = "DodrioToken";

pub struct SessionUser {
	pub sid: String,
	pub id: i32,
	pub account: String,
	pub username: Option<String>,
}

impl TryFrom<Row> for SessionUser {
	type Error = PGError;

	fn try_from(row: Row) -> Result<Self, Self::Error> {
		let sid = row.try_get("sid")?;
		let id = row.try_get(1)?;
		let account = row.try_get("账号")?;
		let username = row.try_get("用户名")?;

		Ok(Self {
			sid,
			id,
			account,
			username,
		})
	}
}

impl FromRequest for SessionUser {
	type Error = Error;
	type Future = LocalBoxFuture<'static, Result<Self, Self::Error>>;
	type Config = ();

	fn from_request(req: &HttpRequest, _: &mut Payload) -> Self::Future {
		use crate::state::State;

		let req = req.clone();

		let fut = async move {
			let token = req
				.headers()
				.get(TOKEN_KEY)
				.throw_msg("token不存在")?
				.to_str()
				.throw_msg("不是有效token")?;

			let state: &web::Data<State> = req.app_data().expect("get state failed");

			state
				.db
				.query_one(include_str!("../sql/select_session_user.sql"), &[&token])
				.await?
				.throw_msg("未找到该登录信息")
		};

		fut.boxed_local()
	}
}
