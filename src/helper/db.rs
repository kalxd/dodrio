//! 第三方库业务上的封装。
use deadpool_postgres::{Pool, Transaction as PoolTransaction};
use tokio_postgres::{
	error::{Error as PGError, SqlState},
	row::Row,
	types::ToSql,
	ToStatement,
};

use std::convert::TryFrom;

use crate::error::{CatchErr, Error, Res};

// 内部错误转换，只为减少代码量。
trait InnerErrorTransfer<T, E: std::error::Error> {
	fn catch_db_dup(self) -> Res<T>;
}

impl<T> InnerErrorTransfer<T, PGError> for Result<T, PGError> {
	fn catch_db_dup(self) -> Res<T> {
		self.map_err(|e| {
			if e.code() == Some(&SqlState::UNIQUE_VIOLATION) {
				return Error::CatchE(CatchErr::DBDuplicate);
			} else {
				return e.into();
			}
		})
	}
}

#[derive(Clone)]
pub struct DB(Pool);

impl DB {
	// 低等级查询函数，处理部分错误。
	async fn raw_query<T>(&'_ self, statement: &'_ T, params: &'_ [&'_ (dyn ToSql + '_ + Sync)]) -> Res<Vec<Row>>
	where
		T: ToStatement + ?Sized,
	{
		let client = self.get().await?;
		client.query(statement, params).await.catch_db_dup()
	}

	/// 尝试自动开启一个事务。
	/// 当得到一个Ok，自动回滚。
	pub async fn try_transaction<T, F, R>(self, f: F) -> Res<T>
	where
		F: Fn(DBTransaction<'_>) -> R,
		R: std::future::Future<Output = Res<T>>,
	{
		let mut client = self.get().await?;
		let transaction = client.transaction().await?;
		let transaction = DBTransaction(transaction);

		f(transaction).await
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
		R: TryFrom<Row>,
		R::Error: std::error::Error,
	{
		let mut rows = self.raw_query(statement, params).await?;

		rows.pop().map(R::try_from).transpose().map_err(Into::into)
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

/// postgresql事务再封装。
pub struct DBTransaction<'a>(PoolTransaction<'a>);
