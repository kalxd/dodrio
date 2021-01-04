//! 整个服务的全局状态。
//! 所需的数据等服务都从这里获取。

use deadpool_postgres::{Manager, ManagerConfig, Pool, RecyclingMethod};
use tokio_postgres::{Config, NoTls};

use std::sync::{Arc, Mutex};

use crate::config::ServerConf;
use crate::helper::{db::DB, user};
use crate::t::SiteInfo;

#[derive(Clone)]
pub struct State {
	/// 网站配置，保留下来，万一日后有用呢？
	pub conf: Arc<ServerConf>,
	/// 网站信息。
	pub info: Arc<Mutex<Option<SiteInfo>>>,
	/// 数据库连接池。
	pub db: DB,
	/// 用户相关数据操作。
	pub user: user::State,
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

		let db = DB::from(pool);
		let user = db.clone().into();

		Self {
			db,
			info: Arc::new(Mutex::new(SiteInfo::load())),
			user,
			conf: Arc::new(config.clone()),
		}
	}
}
