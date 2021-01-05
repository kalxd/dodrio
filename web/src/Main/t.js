/**
 * 一大堆类型定义。
 */
import struct from "../lib/struct";

/**
 * ```
 * interface SiteInfo = {
 *     title = string;
 *     desc = string;
 * }
 * ```
 */
export const SiteInfoType = struct(
	["title", "冈站标题"],
	["desc", "网站描述"]
);
