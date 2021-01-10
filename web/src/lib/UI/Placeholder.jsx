/**
 * 加载中的占位界面。
 */
import React from "react";
import * as R from "rambda";

/**
 * lineRow :: Int -> [ReactNode]
 */
const lineRow = R.times(n => (
	<div key={n} className="line full" />
));

export default function Placeholder() {
	return (
		<div className="ui fluid placeholder">
			<div className="image header">
				{lineRow(2)}
			</div>
			<div className="paragraph">
				{lineRow(6)}
			</div>
		</div>
	);
}
