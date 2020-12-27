import React, { useState, useEffect, ReactNode, ReactChildren } from "react";
import PageResult from "../lib/PageResult";
import Option from "../lib/Option";
import { MeContext, MeType, MeValue } from "./Data/Me";

interface PropType {
	children: ReactChildren
}

export default function MeProvider({children}: PropType): ReactNode {
	const [me, setMe] = useState(new PageResult<Option<MeType>>());

	useEffect(() => {
		const inits = {
			headers: {
				"Context-Type": "application/json"
			}
		};
		me.setLoading();
		setMe(me);

		fetch("/_/user/me", inits)
			.then(r => r.json())
			.then(res => {
				console.log(res);
				const user = new Option(res);
				me.setOk(user);
				console.log(me);
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
		setMe
	};

	return (
		<MeContext.Provider value={value}>
			{children}
		</MeContext.Provider>
	);
}
