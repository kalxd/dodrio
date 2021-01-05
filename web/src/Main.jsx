import React, { useState, useEffect} from "react";
import {
	Layout,
	Alert,
	Skeleton
} from "antd";
import * as R from "rambda";

import App from "./App";
import Setup from "./Setup/Main";

import * as Page from "./lib/page";
import { fmap } from "./lib/util";

import { SiteInfoType } from "./Main/t";

export default function Main() {
	// Page (Maybe SiteInfo)
	const [page, setPage] = useState(Page.empty);
	const [err, setErr] = useState(null);

	useEffect(() => {
		const init = {
			headers: {
				"COntent-Type": "application/json"
			}
		};

		fetch("/_/info", init)
			.then(r => r.json())
			.then(fmap(SiteInfoType.fromJSON))
			.then(Page.pure)
			.then(setPage)
			.catch(setErr)
		;
	}, []);

	const contentView = R.pipe(
		Page.map(page => {
			if (R.isNil(page)) {
				return <Setup />
			}
			else {
				return <App />
			}
		}),
		Page.unwrapOr(<Skeleton />)
	)(page)

	const errView = fmap(err => (
		<Alert message={err} type="error" />
	))(err);

	return (
		<Layout>
			<Layout.Content>
				{errView}
				{contentView}
			</Layout.Content>
		</Layout>
	);
}
