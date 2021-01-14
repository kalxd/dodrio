import React, {
	createContext,
	useState
} from "react";
import SessionProvider, { SessionCtx } from "./Session";

export const MeCtx = createContext(null);

function MeProvider({ children }) {
	const state = useState(null);
	const { fetch } = useContext(SessionCtx);
	console.log(fetch);

	return (
		<MeCtx.Provider value={state}>
			{children}
		</MeCtx.Provider>
	);
}

export default function Main() {
	return (
		<SessionProvider>
			<MeProvider />
		</SessionProvider>
	)
}
