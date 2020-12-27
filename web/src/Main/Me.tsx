import React, { useState, useEffect, ReactNode, ReactChildren } from "react";
import PageResult from "../lib/PageResult";
import Option from "../lib/Option";
import { MeContext, MeType, MeValue, FetchF } from "./Data/Me";
import { readToken } from "./Data/Session";

interface PropType {
	children: ReactChildren
}

export default function MeProvider({children}: PropType): ReactNode {
	const [me, setMe] = useState(new PageResult<Option<MeType>>());
	const token = readToken().unwrap();
	const Fetch = new FetchF(token);

	useEffect(() => {
		me.setLoading();
		setMe(me);

		Fetch.get<MeType>("/_/user/me")
			.then(res => {
				const user = new Option(res);
				me.setOk(user);
				setMe(me);
			})
			.catch(e => {
				me.setErr(e.message);
				setMe(me);
			});
		;
	}, []);

	const value: MeValue = {
		me,
		setMe,
		Fetch
	};

	return (
		<MeContext.Provider value={value}>
			{children}
		</MeContext.Provider>
	);
}
