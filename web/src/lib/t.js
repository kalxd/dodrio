/**
 * 全局共用类型。
 */
import struct from "./struct";

/**
 * type SiteInfoType = {
 *   title :: String
 *   desc :: String
 * }
 */
export const SiteInfoType = struct(
	["title", "标题"],
	["desc", "描述"]
);

/**
 * type E = String | Error
 * type ErrorHookType = {
 *  getError :: String
 *  setError :: E -> ()
 *  clearError :: () -> ()
 * }
 */
export const ErrorHookType = struct(
	"getError",
	"setError",
	"clearError"
);
