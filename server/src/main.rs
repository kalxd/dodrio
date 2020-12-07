use actix_web::{get, App, HttpServer, Responder};
use anyhow::Result;

mod config;
mod error;

#[get("/")]
async fn index() -> impl Responder {
	"hello world"
}

#[actix_web::main]
async fn main() -> Result<()> {
	let config = config::ServerConf::load("./config/config.dhall")?;
	println!("{:?}", config);

	HttpServer::new(|| App::new().service(index))
		.bind(&config)?
		.run()
		.await?;

	Ok(())
}
