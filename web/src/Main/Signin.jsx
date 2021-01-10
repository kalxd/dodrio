/**
 * 登录页面
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
			<Typography.Title>登录</Typography.Title>

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
					rules={itemRule}
					required
				>
					<Input placeholder="登录密码" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">登录</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
