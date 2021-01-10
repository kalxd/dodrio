import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Footer, Content } = Layout;

import Signin from "./Signin";

const CONTAINER_STYLE = {
	margin: "10px auto",
	width: "80%"
};

export default function Main() {
	return (
		<Layout>
			<Layout.Header>
				<Menu mode="horizontal" theme="dark">
					<Menu.Item>
						<Link to="/signin">
							登录
						</Link>
					</Menu.Item>
					<Menu.Item>菜单二</Menu.Item>
				</Menu>
			</Layout.Header>

			<Content>
				<div style={CONTAINER_STYLE}>
					<Switch>
						<Route path="/signin">
							<Signin />
						</Route>
					</Switch>
				</div>
			</Content>

			<Footer />
		</Layout>
	);
}
