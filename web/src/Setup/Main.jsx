import React, { useState } from "react";
import {
	Alert,
	Form,
	Button,
	Input,
	Divider,
	Typography
} from "antd";

import struct from "../lib/struct";
import { noop } from "../lib/util";
import { SiteInfoType } from "../lib/t";
import fetch, { jsonHeader } from "../lib/shttp";

import Error from "../lib/UI/Error";

const BOX_STYLE = {
	width: "60%",
	margin: "60px auto"
}

const LAYOUT = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 18
	}
};

const OFFSET_LAYOUT =  {
	wrapperCol: {
		offset: 6,
		span: 18
	}
};

const ITEM_RULE = [
	{
		required: true
	}
];

const SiteType = struct(
	// String
	["title", "网站标题"],
	// String
	["desc", "网站描述"],
	// String
	["username", "用户名"],
	// String
	["password", "密码"]
);

/**
 * 网站初始页面，第一次进入时出现，此后不再使用。
 * type PropType = {
 *  onRegist :: SiteInfoType -> ()
 * }
 */
function Setup(prop) {
	const { onRegist } = prop;

	const [form] = Form.useForm();
	const [err, setErr] = useState(null);

	// finish :: SiteType -> ()
	const finish = site => {
		const body = SiteType.toJSON(site);

		const init = {
			headers: jsonHeader,
			method: "POST",
			body: JSON.stringify(body)
		};

		fetch("/_/admin/regist", init)
			.then(SiteInfoType.fromJSON)
			.then(onRegist)
			.catch(setErr)
		;
	};

	return (
		<div style={BOX_STYLE}>
			<Typography.Title>
				网站还需要一些基本设置，请填写以下信息
			</Typography.Title>

			<Error error={err} />

			<Form {...LAYOUT}
				  form={form}
				  onFinish={finish}
			>
				<Form.Item {...OFFSET_LAYOUT}>
					<Alert message="一些网站描述" />
				</Form.Item>

				<Form.Item
					label="网站信息"
					name="title"
					required
					rules={ITEM_RULE}
				>
					<Input placeholder="网站的主题，让人眼前一亮、记忆深刻的名字。" />
				</Form.Item>

				<Form.Item
					label="网站描述"
					name="desc"
					required
					rules={ITEM_RULE}
				>
					<Input placeholder="网站的描述、简介。" />
				</Form.Item>

				<Divider />

				<Form.Item {...OFFSET_LAYOUT}>
					<Alert message="新建后台管理员" />
				</Form.Item>

				<Form.Item
					label="用户名"
					name="username"
					required
					rules={ITEM_RULE}
				>
					<Input placeholder="管理员用户名。" />
				</Form.Item>

				<Form.Item
					label="密码"
					name="password"
					required
					rules={ITEM_RULE}
				>
					<Input.Password placeholder="登录密码。" />
				</Form.Item>

				<Form.Item {...OFFSET_LAYOUT}>
					<Button type="primary" htmlType="submit">提交</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

Setup.defaultProps = {
	onRegist: noop
};

export default Setup;
