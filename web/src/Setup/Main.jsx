import React, { useState } from "react";
import * as R from "rambda";
import Form, { Field } from "rc-field-form";

import struct from "../lib/struct";
import Error from "../lib/UI/Error";
import F from "../lib/UI/Field";
import useError from "../lib/Hook/error";

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

const onlyRequire = [
	{
		required: true
	}
];

/**
 * 网站初始页面，第一次进入时出现，此后不再使用。
 * type PropType = {
 *  onRegist :: SiteInfoType -> ()
 * }
 */
function Setup(prop) {
	const { onRegist } = prop;

	const [form] = Form.useForm();
	const error = useError();

	const submitForm = value => {
		console.log(value);
	};

	return (
		<div className="ui container">
			<Form className="ui form" form={form} onFinish={submitForm}>
				<div className="ui message">
					<div className="header">
						马上完成！
					</div>
					<p>
						请填写网站基本信息、创建后台管理员。
					</p>
				</div>

				<Error error={error} />

				<div className="field required">
					<label>网站名称</label>
					<Field rules={onlyRequire} name="title">
						<input placeholder="网站名称" />
					</Field>
				</div>

				<F require label="网站描述" name="title">
					<textarea rows="3" placeholder="网站描述" />
				</F>

				<div className="ui divider" />

				<div className="field required">
					<label>用户名</label>
					<Field rules={onlyRequire} name="username">
						<input placeholder="管理员用户名" />
					</Field>
				</div>

				<div className="field required">
					<label>密码</label>
					<Field rules={onlyRequire} name="password">
						<input type="password" placeholder="管理员登录密码" />
					</Field>
				</div>

				<div className="field">
					<button className="ui primary button" type="submit">提交</button>
				</div>
			</Form>
		</div>
	);
}

Setup.defaultProps = {
	onRegist: R.identity
};

export default Setup;
