import React from "react";
import { Alert } from "antd";
import * as R from "rambda";

import { fmap } from "../util";

/**
 * 显示错误提示框，一般接受参数`Error`。
 * type PropType = {
 *  error: Maybe Error | Maybe String
 *  title: Maybe String
 * }
 */
function Error(prop) {
	const { error, title } = prop;

	const view = fmap(
		R.compose(
			desc => (
				<Alert
					description={desc}
					type="error"
					message={title}
					closable
				/>
			),
			R.when(R.is(Error), e => e.message)
		)
	)(error);

	return view;
}

Error.defaultProps = {
	error: null,
	title: null
};

export default Error;
