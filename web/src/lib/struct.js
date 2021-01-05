/**
 * 仿racket的struct，动中有静，静中有动。
 */
import R from "rambda";

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

	return M;
}
