/**
 * 注册界面。
 */
import React from "react";

import Form, { Field } from "../lib/UI/Form";
import Error from "../lib/UI/Error";

import struct from "../lib/struct"
import useError from "../lib/Hook/error";

/**
 * type FormType = {
 *  username :: String
 *  password :: String
 *  repassword :: String
 * }
 */
const FormType = struct(
	["account", "账号"],
	["password", "密码"],
	["repassword", "确认密码"],
	["username", "用户名"],
	["email", "电子邮箱"]
);

export default function Signup() {

	return (
		<Form>
			<div className="ui header">
				注册新用户
			</div>

			<Field
				label="用户名"
				name="username"
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

			<Field>
				<button type="submit">
					注册
				</button>
			</Field>
		</Form>
	);
}
