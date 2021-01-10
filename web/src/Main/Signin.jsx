/**
 * 注册界面。
 */
import React from "react";
import {
	Form,
	Input,
	Button,
	Typography
} from "antd";

const itemRule = [
	{
		required: true
	}
];

export default function Signup() {
	const [form] = Form.useForm();

	return (
		<>
			<Typography.Title>注册新账号</Typography.Title>

			<Form form={form} layout="vertical">
				<Form.Item
					label="用户名"
					name="username"
					required
					rules={itemRule}
				>
					<Input placeholder="用户名" />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					required
					rules={itemRule}
				>
					<Input.Password placeholder="登录密码" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}
