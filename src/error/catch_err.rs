/// 业务上关心的、需要捕猎的错误。
#[derive(Debug)]
pub enum CatchErr {
	/// 数据库重复。
	DBDuplicate,
}

impl std::fmt::Display for CatchErr {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "数据重复。")
	}
}
