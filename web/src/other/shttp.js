/**
 * 基本头部。
 */
import * as R from "rambda";

/**
 * defHeader :: FetchInitHeader
 */
export const defHeader = {
	"Content-Type": "application/json"
};

/**
 * defInit :: FetchInit
 */
export const defInit = {
	headers: defHeader
};

/**
 * seqInitWith :: FetchInit -> [(FetchInit -> FetchInit)] -> FetchInit
 */
export const seqInitWith = R.reduce((acc, f) => f(acc));

/**
 * seqInit :: [(FetchInit -> FetchInit)] -> FetchInit
 */
export const seqInit = (...fs) => seqInitWith(defInit, fs);

/**
 * Add :: String -> String -> (FetchInit -> FetchInit)
 */
export const Add = R.assocPath;

/**
 * AddWhen :: Bool -> String -> String -> (FetchInit -> FetchInit)
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
 * SetMethod :: String -> FetchInit -> FetchInit
 */
export const SetMethod = Add("method");

/**
 * SetGet :: FetchInit -> FetchInit
 */
export const SetGet = SetMethod("GET");

/**
 * SetPost :: FetchInit -> FetchInit
 */
export const SetPost = SetMethod("POST");

/**
 * SetPut :: FetchInit -> FetchInit
 */
export const SetPut = SetMethod("PUT");

/**
 * SetPatch :: FetchInit -> FetchInit
 */
export const SetPatch = SetMethod("PATCH");

/**
 * SetDelete :: FetchInit -> FetchInit
 */
export const SetDelete = SetMethod("DELETE");

/**
 * SetBody :: JSON a => Maybe a -> FetchInit -> FetchInit
 */
export const SetBody = value => {
	if (R.isNil(value)) {
		return R.identity;
	}
	else {
		const body = JSON.stringify(value);
		return Add("body", body);
	}
};

/**
 * AddHeader :: String -> String -> FetchInit -> FetchInit
 */
export const AddHeader = R.curry((key, value) => {
	const path = `headers.${key}`;
	return Add(path, value);
});

/**
 * AddHeaderWhen :: Bool -> String -> String -> FetchInit -> FetchInit
 */
export const AddHeaderWhen = R.curry((b, key, value) => {
	if (b) {
		return AddHeader(key, value);
	}
	else {
		return R.identity;
	}
});

/**
 * Rem :: String -> (FetchInit -> FetchInit)
 */
export const Rem = R.dissoc;

/**
 * RemWhen :: Bool -> String -> (FetchInit -> FetchInit)
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
