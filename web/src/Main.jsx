import React, { useState, useEffect} from "react";
import {
	Result,
	Skeleton
} from "antd";
import * as R from "rambda";

import App from "./App";
import Setup from "./Setup/Main";

import * as Page from "./lib/page";
import { fmap } from "./lib/util";
import fetch, { jsonHeader } from "./lib/shttp";

import { SiteInfoType } from "./Main/t";

const CONTAINER_STYLE = {
	margin: "40px auto",
	width: "80%",
};

function Loading() {
	return (
		<div style={CONTAINER_STYLE}>
			<Skeleton active paragraph={{ rows: 6 }} />
		</div>
	);
}

export default function Main() {
	// Page (Maybe SiteInfo)
	const [page, setPage] = useState(Page.empty);
	const [err, setErr] = useState(null);

	const setPageSite = R.compose(
		setPage,
		Page.pure
	);

	useEffect(() => {
		const init = {
			headers: jsonHeader
		};

		fetch("/_/info", init)
			.then(fmap(SiteInfoType.fromJSON))
			.then(setPageSite)
			.catch(setErr)
		;
	}, []);

	const contentView = R.pipe(
		Page.map(page => {
			if (R.isNil(page)) {
				return <Setup onRegist={setPageSite} />
			}
			else {
				return <App />
			}
		}),
		Page.unwrapOr(<Loading />)
	)(page)

	const errView = fmap(err => (
		<Result title={err.message} status="error" />
	))(err);

	return (
		<>
			{errView}
			{contentView}
		</>
	);
}
