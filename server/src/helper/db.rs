//! 第三方库业务上的封装。
use deadpool_postgres::Pool;
use tokio_postgres::{error::SqlState, row::Row, types::ToSql, ToStatement};

use crate::error::{CatchErr, Error, Res};

#[derive(Clone)]
pub struct DB(Pool);

impl DB {
	// 低等级查询函数，处理部分错误。
	async fn raw_query<T>(&'_ self, statement: &'_ T, params: &'_ [&'_ (dyn ToSql + '_ + Sync)]) -> Res<Vec<Row>>
	where
		T: ToStatement + ?Sized,
	{
		let client = self.get().await?;
		client.query(statement, params).await.map_err(|e| {
			if e.code() == Some(&SqlState::UNIQUE_VIOLATION) {
				return Error::CatchE(CatchErr::DBDuplicate);
			} else {
				return e.into();
			}
		})
	}

	/*
	pub async fn query<T, R>(&'_ self, statement: &'_ T, params: &'_ [&'_ (dyn ToSql + '_ + Sync)]) -> Res<Vec<R>>
	where
		T: ToStatement + ?Sized,
		R: From<Row>,
	{
		let r = self
			.raw_query(statement, params)
			.await?
			.into_iter()
			.map(Into::into)
			.collect();

		Ok(r)
	}
	 */

	pub async fn query_one<T, R>(
		&'_ self,
		statement: &'_ T,
		params: &'_ [&'_ (dyn ToSql + '_ + Sync)],
	) -> Res<Option<R>>
	where
		T: ToStatement + ?Sized,
		R: From<Row>,
	{
		let mut rows = self.raw_query(statement, params).await?;

		Ok(rows.pop().map(Into::into))
	}

	/*
	/// 仅用于单值的查询，例如查询用户是否存在。
	///
	/// ```
	/// if db.query_b("select 1", &[]).await? {
	///     println!("存在！");
	/// } else {
	///     println!("不存在！");
	/// }
	/// ```

	pub async fn query_b<T>(&'_ self, statement: &'_ T, params: &'_ [&'_ (dyn ToSql + '_ + Sync)]) -> Res<bool>
	where
		T: ToStatement + ?Sized,
	{
		let mut rows = self.raw_query(statement, params).await?;

		let r = rows.pop().map(|row| row.get(0)).unwrap_or(false);
		Ok(r)
	}
	 */
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
