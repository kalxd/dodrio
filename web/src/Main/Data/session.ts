import Option from "../../lib/Option";

const TOKEN_KEY: string = "DODRIO_TOKEN";

/**
 * 从存诸中读取token。
 */
export function readToken(): Option<string> {
	const token = localStorage.getItem(TOKEN_KEY);
	return new Option(token);
}

/**
 * 保存token。
 */
export function writeToken(token: string) {
	localStorage.setItem(TOKEN_KEY, token);
}
