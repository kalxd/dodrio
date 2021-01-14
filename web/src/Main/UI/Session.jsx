/**
 * Session相关组件。
 */
import React, {
	createContext,
	useState
} from "react";
import * as R from "rambda";

import fetch, {
	seqInit,
	seqInitWith,
	AddHeaderWhen,
	SetGet,
	SetPost,
	SetPut,
	SetPatch,
	SetDelete
} from "../../Lib/shttp";

import * as db from "../Lib/db";

const HEADER_TOKEN_KEY = "DODRIO-TOKEN";

/**
 * cocnatUrl :: String -> String
 */
const concatUrl = R.concat("/_");

/**
 * mkUrl :: String -> Maybe Object -> String
 */
const mkUrl = R.curry((url, query) => {
	const baseUrl = concatUrl(url);

	if (R.isNil(query) || R.isEmpty(query)) {
		return baseUrl;
	}
	else {
		const params = R.pipe(
			R.toPairs,
			R.map(R.join("=")),
			R.join("&")
		)(query);

		return `${baseUrl}?${params}`;
	}
});

/**
 * mkInit :: Maybe String -> FetchInit
 */
const mkInit = token => {
	const b = R.isNil(token);
	return seqInit(
		AddHeaderWhen(!b, HEADER_TOKEN_KEY, token)
	);
};

/**
 * seq :: [(FetchInit -> FetchInit)] -> FetchInit -> FetchInit
 */
const seq = R.flip(seqInitWith);

/**
 * mkGet :: JSON a => Maybe String -> String -> Maybe Object -> Promise a
 */
const mkGet = R.curry((token, api, query) => {
	const init = R.pipe(
		mkInit,
		seq([SetGet])
	)(token);
	const url = mkUrl(api, query);

	return fetch(url, init);
});

/**
 * mkPost :: JSON a, JSON b => Maybe String -> String -> Maybe b -> Promise a
 */
const mkPost = R.curry((token, api, body) => {
	const init = R.pipe(
		mkInit,
		seq([
			SetPost,
			SetBody(body)
		])
	)(token);
	const url = mkUrl(api, {});

	return fetch(url, init);
});

/**
 * mkPatch :: JSON a, JSON b => Maybe String -> String -> Maybe b -> Promise a
 */
const mkPatch = R.curry((token, api, body) => {
	const init = R.pipe(
		mkInit,
		seq([
			SetPatch,
			SetBody(body)
		])
	)(token);
	const url = mkUrl(api, {});

	return fetch(url, init);
});

/**
 * mkPut :: JSON a, JSON b => Maybe String -> String -> Maybe b -> Promise a
 */
const mkPut = R.curry((token, api, body) => {
	const init = R.pipe(
		mkInit,
		seq([
			SetPut,
			SetBody(body)
		])
	)(token);
	const url = mkUrl(api, {});

	return fetch(url, init);
});

/**
 * mkDelete :: JSON a => Maybe String -> String -> Maybe Object -> Promise a
 */
const mkDelete = R.curry((token, api, query) => {
	const init = R.pipe(
		mkInit,
		seq([
			SetDelete
		])
	)(token);
	const url = mkUrl(api, query);

	return fetch(url, init);
});

export const SessionCtx = createContext(null);

export default function SessionProvider({ children }) {
	const [token, setToken] = useState(db.getToken());

	const initValue = {
		token,
		fetch: {
			GET: (api, query) => mkGet(token, api, query),
			POST: (api, body) => mkPost(token, api, body),
			PATCH: (api, body) => mkPatch(token, api, body),
			PUT: (api, body) => mkPut(token, api, body),
			DELETE: (api, query) => mkDelete(token, api, query)
		},
		setToken: R.compose(
			setToken,
			R.tap(db.saveToken)
		)
	}

	const [value] = useState(initValue);

	return (
		<SessionCtx value={value}>
			{children}
		</SessionCtx>
	);
}
