import React from "react";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/zh_CN";

import Main from "./Main/Main";
import Setup from "./Setup/Main";

export default function App() {
	return (
		<ConfigProvider locale={locale}>
			<Main />
		</ConfigProvider>
	);
}
