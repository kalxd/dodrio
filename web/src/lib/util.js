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
 * noop :: a -> ()
 * 什么也不做的函数。
 */
export function noop(_) {}

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
		const [a, b] = x;
		as.push(a);
		bs.push(b);
	}

	return [as, bs];
}

/**
 * unzip3 :: [(a, b, c)] -> ([a], [b], [c])
 */
export function unzip3(xs) {
	let as = [];
	let bs = [];
	let cs = [];
	for (const x of xs) {
		const [a, b, c] = x;
		as.push(a);
		bs.push(b);
		cs.push(c);
	}

	return [as, bs, cs];
}
