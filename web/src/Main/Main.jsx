import React from "react";
import { Layout, Menu } from "antd";

const { Footer, Content } = Layout;

export default function Main() {
	return (
		<Layout>
			<Layout.Header>
				<Menu mode="horizontal" theme="dark">
					<Menu.Item>菜单一</Menu.Item>
					<Menu.Item>菜单二</Menu.Item>
				</Menu>
			</Layout.Header>

			<Content>
			</Content>

			<Footer />
		</Layout>
	);
}
