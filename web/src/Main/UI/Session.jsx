/**
 * Session相关组件。
 */
import React, {
	createContext,
	useState
} from "react";
import * as R from "rambda";

import * as db from "../Lib/db";

export const SessionCtx = createContext(null);

export default function SessionProvider({ children }) {
	const token = db.getToken();
	const [state, setState] = useState(token);

	const value = {
		token: state,
		setToken: R.compose(
			setState,
			R.tap(db.setToken)
		)
	};

	return (
		<SessionCtx value={value}>
			{children}
		</SessionCtx>
	);
}
