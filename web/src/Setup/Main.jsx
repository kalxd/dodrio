import React from "react";
import * as R from "rambda";

import Error from "../lib/UI/Error";
import Form, { Field } from "../lib/UI/Form";
import useError from "../lib/Hook/error";
import struct from "../lib/struct";
import fetch, {
	SetBody,
	SetPost,
	seqInit
} from "../lib/shttp";

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
	const error = useError();

	// submitForm :: SiteType -> IO ()
	const submitForm = value => {
		const body = SiteType.toJSON(value);

		const init = seqInit(
			SetBody(body),
			SetPost
		);

		fetch("/_/admin/regist", init)
			.then(onRegist)
			.catch(error.setError)
		;
	};

	return (
		<div className="ui container">
			<Form className="ui form" onFinish={submitForm}>
				<div className="ui message">
					<div className="header">
						马上完成！
					</div>
					<p>
						请填写网站基本信息、创建后台管理员。
					</p>
				</div>

				<Error error={error} />

				<Field require label="网站名称" name="title">
					<input placeholder="网站名称" />
				</Field>

				<Field require label="网站描述" name="desc">
					<textarea rows="3" placeholder="网站描述" />
				</Field>

				<div className="ui divider" />

				<Field require label="用户名" name="username">
					<input placeholder="管理员用户名" />
				</Field>

				<Field require label="密码" name="password">
					<input type="password" placeholder="管理员登录密码" />
				</Field>

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
