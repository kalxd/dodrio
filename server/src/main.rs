use actix_web::{get, web, App, HttpServer, Responder};
use anyhow::Result;

mod config;
mod state;

#[get("/")]
async fn index(state: web::Data<state::State>) -> impl Responder {
	let client = state.pool.get().await.unwrap();
	let rows = client.query(r#"select 'hello'::TEXT"#, &[]).await.unwrap();
	let value: String = rows[0].get(0);
	value
}

#[actix_web::main]
async fn main() -> Result<()> {
	let config = config::ServerConf::load("./config/config.dhall")?;
	let state = state::State::create(&config);

	HttpServer::new(move || App::new().data(state.clone()).service(index))
		.bind(&config)?
		.run()
		.await?;

	Ok(())
}
