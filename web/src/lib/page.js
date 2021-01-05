/**
 * 页面的状态机。
 * data Page a = Loading | Finish a
 */
import { curry, view, over, pipe } from "rambda";
import struct from "./struct";

/**
 * Page基本类型。
 */
export const PageType = struct(
	// Bool
	"loading",
	// a
	"context"
);

/**
 * isLoading :: Page a -> Bool
 */
const isLoading = view(PageType.loadingLens);

/**
 * empty :: Page a
 * 加载中的状态。
 */
export const empty = PageType.create(true, null);

/**
 * pure :: a -> Page a
 */
export function pure(a) {
	return PageType.create(false, a);
}

/**
 * map :: (a -> b) -> Page a -> Page b
 */
export const map = curry((f, x) => {
	if (isLoading(x)) {
		return x;
	}
	else {
		return over(PageType.contextLens, f, x);
	}
});

/**
 * bind :: (a -> Page b) -> Page a -> Page b
 */
export const bind = curry((f, x) => {
	if (isLoading(x))  {
		return x;
	}
	else {
		return pipe(
			view(PageType.contextLens),
			f
		)(x);
	}
});

/**
 * render :: ReactNode -> Page ReactNode -> ReactNode
 */
export const unwrapOr = curry((node, x) => {
	if (isLoading(x)) {
		return node;
	}
	else {
		return view(PageType.contextLens, x);
	}
});
