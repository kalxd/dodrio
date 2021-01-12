/**
 * 基本头部。
 */
import * as R from "rambda";

export const jsonHeader = {
	"Content-Type": "application/json"
};

/**
 * headerSeqWith :: HeaderMap -> [(HeaderMap -> HeaderMap)] -> HeaderMap
 */
export const headerSeqWith = R.reduce((acc, f) => f(acc));

/**
 * headerSeq :: ...(HeaderMap -> HeaderMap) ->
 */
export const headerSeq = (...args) => {
	return headerSeqWith(jsonHeader, args);
};

/**
 * Add :: String -> String -> (HeaderMap -> HeaderMap)
 */
export const Add = R.assoc;

/**
 * AddWhen :: Bool -> String -> String -> (HeaderMap -> HeaderMap)
 */
export const AddWhen = R.curry((b, key, value) => {
	if (b) {
		return Add(key, value);
	}
	else {
		return R.identity;
	}
});

/**
 * Rem :: String -> (HeaderMap -> HeaderMap)
 */
export const Rem = R.dissoc;

/**
 * RemWhen :: Bool -> String -> (HeaderMap -> HeaderMap)
 */
export const RemWhen = R.curry((b, key) => {
	if (b) {
		return Rem(key);
	}
	else {
		return R.identity;
	}
});

/**
 * 简易fetch客户端，仅对返回格式加以处理。
 */
export default async function(url, init) {
	const res = await fetch(url, init)
	const body = await res.json();

	if (res.ok) {
		return body;
	}
	else {
		throw new Error(body.msg);
	}
}
