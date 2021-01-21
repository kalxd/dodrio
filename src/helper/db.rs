//! 第三方库业务上的封装。
use deadpool_postgres::Pool;
use tokio_postgres::{
	error::{Error as PGError, SqlState},
	row::Row,
	types::ToSql,
	ToStatement,
};

use std::convert::TryFrom;

use crate::error::{CatchErr, Error, Res};

// 内部错误转换，只为减少代码量。
pub(super) trait InnerErrorTransfer<T, E: std::error::Error> {
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

	#[inline]
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

	#[inline]
	pub async fn execute<T: ?Sized>(&self, statement: &T, params: &[&(dyn ToSql + Sync)]) -> Res<u64>
	where
		T: ToStatement,
	{
		let client = self.get().await?;

		let u = client.execute(statement, params).await?;
		Ok(u)
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
