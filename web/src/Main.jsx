import React, { useState, useEffect } from "react";
import * as R from "rambda";

import Placeholder from "./lib/UI/Placeholder";
import Error from "./lib/UI/Error";

import * as PageType from "./lib/page";
import { fmap } from "./lib/util";
import useError from "./lib/Hook/error";
import fetch, { SetGet, seqInit } from "./lib/shttp";
import { SiteInfoType } from "./lib/t";

import Provider from "./Provider";
import Setup from "./Setup/Main";

const Box = ({ children }) => (
	<div className="ui container">
		{children}
	</div>
);

function App() {
	// PageType (Maybe SiteInfoType)
	const [page, setPage] = useState(PageType.empty);
	const error = useError();

	const setSitePage = R.compose(
		setPage,
		PageType.pure,
		fmap(SiteInfoType.fromJSON)
	);

	useEffect(() => {
		const init = seqInit(
			SetGet
		);

		fetch("/_/info", init)
			.then(setSitePage)
			.catch(error.setError)
		;
	}, []);

	const view = R.pipe(
		PageType.map(page => {
			if (R.isNil(page)) {
				return (<Setup />)
			}
			else {
				return (<h1>hello world</h1>);
			}
		}),
		PageType.unwrapOr((
			<Box>
				<Placeholder />
			</Box>
		))
	)(page);

	return (
		<>
			<Box>
				<Error error={error} />
			</Box>
			{view}
		</>
	);
}

export default function Main() {
	return (
		<Provider>
			<App />
		</Provider>
	);
}
