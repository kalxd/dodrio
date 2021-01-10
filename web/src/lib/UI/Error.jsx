import React from "react";
import * as R from "rambda";

import { fmap } from "../util";

/**
 * 显示错误提示框，一般接受参数`Error`。
 * type PropType = {
 *  error: ErrorHookType
 *  title: Maybe String
 *  onClose: Maybe (() -> IO ())
 * }
 */
function Error(prop) {
	const { error, title, onClose } = prop;
	const errorMsg = error.getError();

	if (R.isNil(errorMsg)) {
		// 没有错误，就不用显示。
		return null;
	}

	const closeClick = R.defaultTo(error.clearError, onClose);
	const mTitle = fmap(title => (
		<div class="headder">{title}</div>
	))(title);

	return (
		<div class="ui message red">
			<i onClick={closeClick} className="icon close" />
			{mTitle}
			<p>{error.getError()}</p>
		</div>
	);
}

Error.defaultProps = {
	error: null,
	title: null,
	onClose: null
};

export default Error;
