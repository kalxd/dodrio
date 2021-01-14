import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import * as R from "rambda";

import Placeholder from "./Lib/UI/Placeholder";
import Error from "./Lib/UI/Error";
import { SiteInfoCtx } from "./Lib/UI/SiteInfo";

import * as PageType from "./Lib/page";
import { fmap } from "./Lib/util";
import useError from "./Lib/Hook/error";
import fetch, { SetGet, seqInit } from "./Lib/shttp";
import { SiteInfoType } from "./Lib/t";

import Setup from "./Setup/Main";
import {default as MainApp } from "./Main/Main";

const Box = ({ children }) => (
	<div className="ui container">
		{children}
	</div>
);

function Router() {
	return (
		<Switch>
			<Route path="/admin">
				<h1>hello admin</h1>
			</Route>

			<Route path="*">
				<MainApp />
			</Route>
		</Switch>
	);
}

export default function App() {
	// PageType (Maybe SiteInfoType)
	const [page, setPage] = useState(PageType.empty);
	const error = useError();
	const [_, setSite] = useContext(SiteInfoCtx);

	const setSitePage = R.compose(
		setPage,
		PageType.pure,
		R.tap(setSite)
	);

	useEffect(() => {
		const init = seqInit(
			SetGet
		);

		fetch("/_/info", init)
			.then(fmap(SiteInfoType.fromJSON))
			.then(setSitePage)
			.catch(error.setError)
		;
	}, []);

	const view = R.pipe(
		PageType.map(page => {
			if (R.isNil(page)) {
				return (<Setup onRegist={setSitePage} />)
			}
			else {
				return (<Router />);
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
			<Error error={error} />
			{view}
		</>
	);
}
