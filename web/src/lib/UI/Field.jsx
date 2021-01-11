/**
 * 表单一栏，rc-field-form的Field再封装。
 */
import React from "react";
import { Field as FormField } from "rc-field-form";
import * as R from "rambda";
import { fmap } from "../util";

/**
 * drawLabel :: Maybe String -> ReactNode
 */
const drawLabel = fmap(label => (
	<label>{label}</label>
));

/**
 * drawError :: Maybe String -> ReactNode
 */
const drawError = fmap(e => (
	<div className="ui pointing red basic label">{e}</div>
));


/**
 * type PropType = {
 *  name :: String
 *  label :: Maybe String
 *  require :: Bool
 *  v :: [Rule]
 * }
 */
function Field(prop) {
	const {
		label,
		name,
		require,
		v,
		children,
		...rest
	} = prop;

	const rules = [
		{ required: require }
	];

	const fieldProp = {
		name,
		rules,
		...rest
	};

	return (
		<FormField {...fieldProp}>
			{(_, meta, __) => {
				const error = R.head(meta.errors);

				return (
					<div className="field">
						{drawLabel(label)}
						{children}
						{drawError(error)}
					</div>
				);
			}}
		</FormField>
	);
}

Field.defaultProps = {
	label: ""
};

export default Field;
