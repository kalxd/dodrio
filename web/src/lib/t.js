/**
 * 全局共用类型。
 */
import struct from "./struct";

/**
 * SiteInfo = {
 *   title :: String
 *   desc :: String
 * }
 */
export const SiteInfoType = struct(
	["title", "冈站标题"],
	["desc", "网站描述"]
);
