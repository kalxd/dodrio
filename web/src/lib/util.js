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

/**
 * 挑选样式类。
 * 接受一个基础类，再接受一个值都为Bool的object。
 * 若object的值为true，它的key将作为样式类添到基础类中。
 *
 * ```js
 * pickClass("ui button", { primary: true, danger: false })
 * // "ui button primary"
 * ```
 */
export function pickClass(base, prop) {
	const baseKlass = base.trim();

	const klass = R.pipe(
		R.filter((v, _) => v),
		R.keys,
		R.join(" ")
	)(prop);

	if (R.isEmpty(baseKlass)) {
		return klass;
	}
	else {
		const ws = (klass => {
			if (R.isEmpty(klass)) {
				return "";
			}
			else {
				return " "
			}
		})(klass);

		return `${baseKlass}${ws}${klass}`;
	}
}
