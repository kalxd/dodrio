import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

			<Route path="/">
				<MainApp />
			</Route>
		</Switch>
	);
}

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
			<Box>
				<Error error={error} />
			</Box>
			{view}
		</>
	);
}

export default function Main() {
	return (
		<BrowserRouter>
			<Provider>
				<App />
			</Provider>
		</BrowserRouter>
	);
}
