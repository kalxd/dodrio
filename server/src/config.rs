//! 整个服务的基本配置。
use std::net::{IpAddr, SocketAddr, ToSocketAddrs};
use std::path::Path;

use anyhow::{Context, Result};
use serde::Deserialize;
use serde_dhall;

/// 配置选项。
#[derive(Debug, Deserialize)]
pub struct ServerConf {
	port: u16,
	addr: IpAddr,
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
		let addr = SocketAddr::new(self.addr, self.port);
		Ok(Some(addr).into_iter())
	}
}
