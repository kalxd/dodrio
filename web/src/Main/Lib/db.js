/**
 * 本地数据相关操作。
 */
import * as R from "rambda";

const storage = window.localStorage;
const TOKEN_KEY = "DODRIO_TOKEN";

/**
 * getToken :: () -> IO (Maybe String)
 */
export function getToken() {
	return storage.getItem(TOKEN_KEY);
}

/**
 * saveToken :: Maybe String -> IO ()
 * 转入空值，将会删除旧值。
 */
export function saveToken(token) {
	if (R.isNil(token)) {
		storage.removeItem(TOKEN_KEY);
	}
	else {
		storage.setItem(TOKEN_KEY, token);
	}
}
