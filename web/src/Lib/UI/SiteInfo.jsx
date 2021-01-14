/**
 * 网站信息全局配置。
 */
import React, { createContext, useState } from "react";

export const SiteInfoCtx = createContext(null);

export default function SiteInfoProvider({ children }) {
	const [value, setValue] = useState(null);

	return (
		<SiteInfoCtx.Provider value={[value, setValue]}>
			{children}
		</SiteInfoCtx.Provider>
	);
}
