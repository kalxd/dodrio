/**
 * 表单一栏，rc-field-form的Field再封装。
 */
import React from "react";
import { Field as FormField } from "rc-field-form";
import * as R from "rambda";
import { fmap, pickClass } from "../util";

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

const valueLens = R.lensProp("value");

const setDefaultValue = R.over(
	valueLens,
	R.defaultTo("")
);

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
		{ required: require },
		...v
	];

	const fieldProp = {
		name,
		rules,
		...rest
	};

	return (
		<FormField {...fieldProp}>
			{(control, meta, _) => {
				const error = R.head(meta.errors);
				const fieldKlass ={
					error: !R.isNil(error),
					required: require
				};

				const controlChildren = React.cloneElement(
					children,
					setDefaultValue(control)
				);

				return (
					<div className={pickClass("field", fieldKlass)}>
						{drawLabel(label || name)}
						{controlChildren}
						{drawError(error)}
					</div>
				);
			}}
		</FormField>
	);
}

Field.defaultProps = {
	label: null,
	require: false,
	v: []
};

export default Field;
