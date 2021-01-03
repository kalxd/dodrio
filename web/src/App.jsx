import React from "react";
import { ConfigProvider, DatePicker } from "antd";
import locale from "antd/lib/locale/zh_CN";

export default function App() {
	return (
		<ConfigProvider locale={locale}>
			<h1>hello world</h1>
			<DatePicker />
		</ConfigProvider>
	);
}
