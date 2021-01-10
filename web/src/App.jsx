/**
 * 主界面。
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/zh_CN";

import Main from "./Main/Main";

export default function App() {
	return (
		<BrowserRouter>
			<ConfigProvider locale={locale}>
				<Main />
			</ConfigProvider>
		</BrowserRouter>
	);
}
