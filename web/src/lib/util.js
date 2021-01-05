/**
 * 共用的数据结构或函数。
 */

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
