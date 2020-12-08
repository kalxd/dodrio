use anyhow::Result;
use deadpool_postgres::Pool;

use dodrio_base::User;

#[derive(Clone)]
pub struct State {
	pool: Pool,
}

impl From<Pool> for State {
	fn from(pool: Pool) -> Self {
		Self { pool }
	}
}

impl State {
	pub fn create_user(&self, data: u32) -> Result<User> {}
}
