/**
 * 注册页面。
 */
import React from "react";

import Form, { Field } from "../lib/UI/Form";

export default function Signup() {
	const submitForm = data => {
		console.log(data);
	};

	return (
		<Form className="ui raised segment form" onFinish={submitForm}>
			<div className="ui header">
				注册一个新用户
			</div>

			<Field
				label="账号"
				name="account"
				require
			>
				<input placeholder="用户名" />
			</Field>

			<Field
				label="密码"
				name="password"
				require
			>
				<input type="password" placeholder="登录密码" />
			</Field>

			<Field
				label="确定密码"
				name="repassword"
				require
			>
				<input type="password" placeholder="再次确认密码。" />
			</Field>

			<Field
				label="用户名"
				name="username"
			>
				<input placeholder="显示出来的名称" />
			</Field>

			<Field
				label="电子邮箱"
				name="email"
				require
			>
				<input placeholder="预留电子箱邮，找回以此为凭证，不会发送任何邮箱" />
			</Field>

			<Field>
				<button className="ui primary button">登录</button>
			</Field>
		</Form>
	);
}
