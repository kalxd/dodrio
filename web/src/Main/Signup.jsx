/**
 * 注册页面。
 */
import React from "react";
import {
	Form,
	Button,
	Input,
	Typography
} from "antd";

const itemRule = [
	{
		required: true
	}
];

export default function Signup() {
	const [form] = Form.useForm();

	const submitForm = data => {
		console.log(data);
	};

	return (
		<div>
			<Typography.Title>注册</Typography.Title>

			<Form form={form} layout="vertical" onFinish={submitForm}>
				<Form.Item
					label="用户名"
					name="username"
					rules={itemRule}
					required
				>
					<Input placeholder="用户名" />
				</Form.Item>
				<Form.Item
					label="密码"
					name="password"
					rules={itemRule}
					required
				>
					<Input.Password placeholder="登录密码" />
				</Form.Item>
				<Form.Item
					label="确定密码"
					name="repassword"
					required
					rules={itemRule}
				>
					<Input.Password placeholder="再次确认密码。" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">登录</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
