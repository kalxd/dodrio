use actix_web::{App, HttpServer};
use anyhow::Result;

mod api;
mod config;
mod error;
mod helper;
mod state;
mod t;

#[actix_web::main]
async fn main() -> Result<()> {
	let config = config::ServerConf::load("./config/config.dhall")?;
	let state = state::State::create(&config);

	HttpServer::new(move || {
		App::new()
			.data(state.clone())
			.app_data(state.clone())
			.service(api::build())
	})
	.bind(&config)?
	.run()
	.await?;

	Ok(())
}
