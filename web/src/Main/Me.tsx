import React, { useState, useEffect, ReactNode, ReactChildren } from "react";
import PageResult from "../lib/PageResult";
import { MeContext, MeType } from "./Data/Me";

interface PropType {
	children: ReactChildren
}

// 全局锁。
let isFreezen = false;

export default function MeProvider({children}: PropType): ReactNode {
	const [me, setMe] = useState(new PageResult<MeType>());

	useEffect(() => {
		if (isFreezen) {
			return ;
		}
		isFreezen = true;

		const inits = {
			headers: {
				"Context-Type": "application/json",
			},
			method: "POST"
		};
		me.setLoading();
		setMe(me);

		fetch("/_/user/me", inits)
			.then(r => r.json())
			.then(res => {
				me.setOk(res);
				setMe(me);
			})
			.catch(e => {
				me.setErr(e.message);
				setMe(me);
			});
		;
	});

	return (
		<MeContext.Provider value={me}>
			{children}
		</MeContext.Provider>
	);
}
