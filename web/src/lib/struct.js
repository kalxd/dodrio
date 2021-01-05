/**
 * 仿racket的struct，动中有静，静中有动。
 */
import * as R from "rambda";
import { unzip } from "./util";

/**
 * data SymLike = String | (String, String)
 * tr :: SymLink -> (String, String)
 */
const tr = R.when(
	R.is(String),
	s => ([s, s])
);

/**
 * 接受一系列字段，能自动生成对应的结构体（object）。
 * 同时附加一系列辅助函数。
 * const MyType = struct("id", "name");
 * const MyJson = struct(
 *   "id",
 *   ["name", "json-name"]
 * );
 */
export default function struct(...args) {
	// 动态模块。
	let M = {};
	const [objKeys, jsonKeys] = R.pipe(
		R.map(tr),
		unzip
	)(args);

	/**
	 * 值构造体。
	 */
	M.create = R.curryN(args.length, (...args) => {
		const ps = R.zip(objKeys, args);
		return R.fromPairs(ps);
	});

	/**
	 * 转化为JSON。
	 */
	M.toJSON = R.compose(
		R.fromPairs,
		R.zip(jsonKeys),
		R.values
	);

	/**
	 * 从JSON转化为结构体。
	 */
	M.fromJSON = R.compose(
		R.fromPairs,
		R.zip(objKeys),
		R.values
	);

	// 生成各个Lens
	for (const key of objKeys) {
		M[`${key}Lens`] = R.lensProp(key);
	}

	return M;
}
