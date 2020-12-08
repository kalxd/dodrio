//! 整个服务的全局状态。
//! 所需的数据等服务都从这里获取。

use deadpool_postgres::{Manager, ManagerConfig, Pool, RecyclingMethod};
use tokio_postgres::{Config, NoTls};

use crate::config::ServerConf;
use crate::helper::DB;

#[derive(Clone)]
pub struct State {
	/// 数据库连接池。
	pub db: DB,
}

impl State {
	pub fn create(config: &ServerConf) -> Self {
		let mut pg_cfg = Config::new();

		pg_cfg
			.user(&config.db.user)
			.password(&config.db.password)
			.dbname(&config.db.dbname)
			.host(&config.db.host.to_string())
			.port(config.db.port);

		let mgr_cfg = ManagerConfig {
			recycling_method: RecyclingMethod::Fast,
		};
		let mgr = Manager::from_config(pg_cfg, NoTls, mgr_cfg);

		let pool = Pool::new(mgr, 16);

		Self { db: pool.into() }
	}
}
