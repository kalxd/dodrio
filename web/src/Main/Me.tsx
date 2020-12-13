import React, { useState, useEffect, ReactNode, ReactChildren } from "react";
import PageResult from "../lib/PageResult";
import Option from "../lib/Option";
import { MeContext, MeType } from "./Data/Me";

interface PropType {
	children: ReactChildren
}

// 全局锁。
let isFreezen = false;
console.log("do this?");

export default function MeProvider({children}: PropType): ReactNode {
	const [me, setMe] = useState(new PageResult<Option<MeType>>());

	useEffect(() => {
		console.log(isFreezen);
	}, []);

	return (
		<MeContext.Provider value={me}>
			{children}
		</MeContext.Provider>
	);
}
