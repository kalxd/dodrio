/**
 * rc-field-form之Form再封装。
 * 隐藏没必要的细节，只展现基本表单提交。
 */
import React from "react";
import RcForm from "rc-field-form";
import * as R from "rambda";
import Field from "./Field";

import { pickClass } from "../util";

/**
 * type PropType = {
 *  initValue :: object
 *  className :: String
 *  loading :: Bool
 *  onFinish :: object -> IO ()
 * }
 */
function Form(prop) {
	const {
		children,
		initValue,
		className,
		loading,
		...rest
	} = prop;

	const [form] = RcForm.useForm();

	const baseKlass = (klass => {
		const k = klass.trim();

		if (R.isEmpty(k)) {
			return "ui form";
		}
		else {
			return `ui ${k} form`;
		}
	})(className);

	const formKlass = pickClass(
		baseKlass,
		loading
	);

	const formProp = {
		form,
		initialvalue: initValue,
		className: formKlass,
		...rest
	};

	return (
		<RcForm {...formProp}>
			{children}
		</RcForm>
	);
}

Form.defaultProps = {
	className: "",
	loading: false
}

Form.Field = Field;

export default Form;
