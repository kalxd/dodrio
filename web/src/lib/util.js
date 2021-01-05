/**
 * 共用的数据结构或函数。
 */
import * as R from "rambda";

const _fmap = (...args) => {
	const [f, ...xs] = args;
	if (R.any(R.isNil, xs)) {
		return null;
	}
	else {
		return f(...xs);
	}
};

/**
 * fmap :: (a -> z) -> Maybe a -> Maybe z
 */
export const fmap = R.curryN(2, _fmap);

/**
 * fmap2 :: (a1 -> a2 -> z) -> Maybe a1 -> Maybe a2 -> Maybe z
 */
export const fmap2 = R.curryN(3, _fmap);

/**
 * unzip :: [(a, b)] -> ([a], [b])
 * 分解数组。
 */
export function unzip(xs) {
	let as = [];
	let bs = [];
	for (const x of xs) {
		as.push(x[0]);
		bs.push(x[1]);
	}

	return [as, bs];
}
