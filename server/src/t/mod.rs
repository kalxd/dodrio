use actix_web::{dev::Payload, web, FromRequest, HttpRequest};
use chrono::{offset::Local, DateTime};
use dodrio_derive::LikeUser;
use futures::future::{FutureExt, LocalBoxFuture};
use serde::Serialize;
use tokio_postgres::{error::Error as PGError, row::Row};

use std::convert::TryFrom;

use crate::error::{Error, Throwable};

pub mod mics;
pub mod req;

/// 已登录用户的详细信息。
///
/// 忽略一些没用的信息。
#[derive(Serialize, LikeUser)]
pub struct Me {
	pub id: i32,
	#[serde(rename = "账号")]
	pub account: String,
	#[serde(rename = "用户名")]
	pub username: Option<String>,
	#[serde(rename = "电子邮箱")]
	pub email: String,
	#[serde(rename = "创建日期")]
	pub create_date: DateTime<Local>,
}

impl<'a> TryFrom<&'a Row> for Me {
	type Error = PGError;

	fn try_from(row: &'a Row) -> Result<Self, Self::Error> {
		let id = row.try_get("id")?;
		let account = row.try_get("账号")?;
		let username = row.try_get("用户名")?;
		let email = row.try_get("电子邮箱")?;
		let create_date = row.try_get("创建日期")?;

		Ok(Self {
			id,
			account,
			username,
			email,
			create_date,
		})
	}
}

impl TryFrom<Row> for Me {
	type Error = PGError;

	fn try_from(row: Row) -> Result<Self, Self::Error> {
		Self::try_from(&row)
	}
}

pub struct SessionUser {
	pub sid: String,
	pub user: Me,
}

impl<'a> TryFrom<&'a Row> for SessionUser {
	type Error = PGError;

	fn try_from(row: &'a Row) -> Result<Self, Self::Error> {
		let sid = row.try_get("sid")?;
		let user = Me::try_from(row)?;

		Ok(Self { sid, user })
	}
}

impl TryFrom<Row> for SessionUser {
	type Error = PGError;

	fn try_from(row: Row) -> Result<Self, Self::Error> {
		Self::try_from(&row)
	}
}

impl Into<Me> for SessionUser {
	fn into(self) -> Me {
		self.user
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
			let token = req::ask_token(&req).unauth("请登录")?;
			let state: &web::Data<State> = req.app_data().expect("get state failed");

			state
				.db
				.query_one(include_str!("../sql/select_session_user.sql"), &[&token])
				.await?
				.unauth("请登录")
		};

		fut.boxed_local()
	}
}
