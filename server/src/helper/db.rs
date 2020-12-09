//! 第三方库业务上的封装。
use anyhow::Result;
use deadpool_postgres::Pool;
use tokio_postgres::{row::Row, types::ToSql, ToStatement};

use std::convert::{TryFrom, TryInto};

use crate::error::{Error, Res};

#[derive(Clone)]
pub struct DB(Pool);

impl DB {
	pub async fn query<T, R>(&'_ self, statement: &'_ T, params: &'_ [&'_ (dyn ToSql + '_ + Sync)]) -> Res<Vec<R>>
	where
		T: ToStatement + ?Sized,
		R: TryFrom<Row, Error = Error>,
	{
		let client = self.get().await?;
		let rows = client.query(statement, params).await?;
		rows.into_iter().map(TryFrom::try_from).collect()
	}

	pub async fn query_<T, R>(&'_ self, statement: &'_ T) -> Result<Vec<R>>
	where
		T: ToStatement + ?Sized,
		R: From<Row>,
	{
		// self.query(statement, &[]).await
		unimplemented!()
	}

	pub async fn query_one<T, R>(
		&'_ self,
		statement: &'_ T,
		params: &'_ [&'_ (dyn ToSql + '_ + Sync)],
	) -> Res<Option<R>>
	where
		T: ToStatement + ?Sized,
		R: TryFrom<Row, Error = Error>,
	{
		let client = self.get().await?;
		let mut rows = client.query(statement, params).await?;

		rows.pop().map(TryInto::try_into).transpose()
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
