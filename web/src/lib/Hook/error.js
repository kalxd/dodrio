import { useState } from "react";
import * as R from "rambda";

import { fmap } from "../util";
import { ErrorHookType } from "../t";

/**
 * 创建新的错误相关Hooks。
 * ```
 * type E = String | Error;
 * useError :: Maybe E -> ErrorHookType
 * ```
 * 生成的hooks不对用户开放，内置组件会自动处理。
 */
export default function useError(raw = null) {
	const [value, setValue] = useState(raw);

	const getError = () => {
		return fmap(R.when(
			R.is(Error),
			e => e.message
		))(value);
	};

	const clearError = () => setValue(null);

	return ErrorHookType.gen(getError, setValue, clearError);
}
