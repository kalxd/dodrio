//! 整个服务的基本配置。
use std::net::{IpAddr, SocketAddr, ToSocketAddrs};
use std::path::Path;

use anyhow::{Context, Result};
use serde::Deserialize;
use serde_dhall;

/// 数据库配置。
#[derive(Debug, Deserialize, Clone)]
pub struct DBConf {
	pub host: IpAddr,
	pub port: u16,
	pub user: String,
	pub password: String,
	pub dbname: String,
}

/// 配置选项。
#[derive(Debug, Deserialize, Clone)]
pub struct ServerConf {
	port: u16,
	host: IpAddr,
	pub db: DBConf,
	pub salt: String,
}

impl ServerConf {
	pub fn load<P: AsRef<Path>>(path: P) -> Result<Self> {
		serde_dhall::from_file(path)
			.parse()
			.context("无法加载配置文件config.dhall")
	}
}

impl ToSocketAddrs for ServerConf {
	type Iter = std::option::IntoIter<SocketAddr>;

	fn to_socket_addrs(&self) -> std::io::Result<Self::Iter> {
		let addr = SocketAddr::new(self.host, self.port);
		Ok(Some(addr).into_iter())
	}
}
