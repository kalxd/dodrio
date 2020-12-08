//! 第三方库业务上的封装。
use anyhow::Result;
use deadpool_postgres::Pool;
use tokio_postgres::{row::Row, types::ToSql, ToStatement};

#[derive(Clone)]
pub struct DB(Pool);

impl DB {
	pub async fn query<T, R>(&'_ self, statement: &'_ T, params: &'_ [&'_ (dyn ToSql + '_ + Sync)]) -> Result<Vec<R>>
	where
		T: ToStatement + ?Sized,
		R: From<Row>,
	{
		let client = self.get().await?;
		let rows = client.query(statement, params).await?;

		Ok(rows.into_iter().map(Into::into).collect())
	}

	pub async fn query_<T, R>(&'_ self, statement: &'_ T) -> Result<Vec<R>>
	where
		T: ToStatement + ?Sized,
		R: From<Row>,
	{
		self.query(statement, &[]).await
	}
}

impl From<Pool> for DB {
	fn from(pool: Pool) -> Self {
		Self(pool)
	}
}

impl std::ops::Deref for DB {
	type Target = Pool;

	fn deref(&self) -> &Self::Target {
		&self.0
	}
}
