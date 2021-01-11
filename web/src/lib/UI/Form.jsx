/**
 * rc-field-form之Form再封装。
 * 隐藏没必要的细节，只展现基本表单提交。
 */
import React from "react";
import RcForm from "rc-field-form";
export { default as Field } from "./Field";

/**
 * type PropType = {
 *  initValue :: object
 *  onSubmit :: object -> IO ()
 * }
 */
function Form(prop) {
	const {
		children,
		initValue,
		...rest
	} = prop;

	const [form] = RcForm.useForm();

	const formProp = {
		form,
		initialvalue: initValue,
		...rest
	};

	return (
		<RcForm {...formProp}>
			{children}
		</RcForm>
	);
}

export default Form;
