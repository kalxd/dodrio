/**
 * 仿racket的struct，动中有静，静中有动。
 */
import * as R from "rambda";
import { unzip3 } from "./util";

/**
 * 空白JSON转换器。
 */
const JsonIdentity = {
	toJSON: R.identity,
	fromJSON: R.identity
};

/**
 * data SymLike = String | (String, String) | (String, Type) | (String, String, Type)
 * tr :: SymLink -> (String, String, Type)
 */
const tr = field => {
	if (R.is(String, field)) {
		return [field, field, JsonIdentity];
	}

	const size = field.length;

	if (size == 1) {
		// ["x"]
		const [x] = field;
		return [x, x, JsonIdentity];
	}
	else if (size == 2) {
		// ["x", ?]
		const [x, y] = field;

		if (R.is(String, y)) {
			// ["x", "y"]
			return [x, y, JsonIdentity];
		}
		else {
			// ["x", Type]
			return [x, x, y];
		}
	}
	else {
		// ["x", "y", Type]
		return field;
	}
};

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
	const [objKeys, jsonKeys, trs] = R.pipe(
		R.map(tr),
		unzip3
	)(args);

	/**
	 * 值构造体。
	 */
	M.gen = R.curryN(args.length, (...args) => {
		const ps = R.zip(objKeys, args);
		return R.fromPairs(ps);
	});

	/**
	 * 转化为JSON。
	 */
	M.toJSON = R.compose(
		R.fromPairs,
		R.zip(jsonKeys),
		R.map(([Type, x]) => {
			const f = R.cond([
				[R.isNil, R.identity],
				[R.is(Array), R.map(Type.toJSON)],
				[R.T, Type.toJSON]
			]);
			return f(x);
		}),
		R.zip(trs),
		R.props(objKeys)
	);

	/**
	 * 从JSON转化为结构体。
	 */
	M.fromJSON = R.compose(
		R.fromPairs,
		R.zip(objKeys),
		R.map(([Type, x]) => {
			const f = R.cond([
				[R.isNil, R.identity],
				[R.is(Array), R.map(Type.fromJSON)],
				[R.T, Type.fromJSON]
			]);
			return f(x);
		}),
		R.zip(trs),
		R.props(jsonKeys)
	);

	// 生成各个Lens
	for (const key of objKeys) {
		M[`${key}Lens`] = R.lensProp(key);
	}

	return M;
}
