import React, { createContext, useState } from "react";

export const MeCtx = createContext(null);

export default function MeProvider({ children }) {
	const state = useState(null);

	return (
		<MeCtx.Provider value={state}>
			{children}
		</MeCtx.Provider>
	);
}
