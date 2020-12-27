import { ReactNode } from "react";

/**
 * 万恶的空值。
 */
export default class Option<T> {
	private inner: T | undefined | null;

	constructor(data: T | undefined | null) {
		this.inner = data;
	}

	/**
	 * 更改内部的值。
	 * + 内部的值为`Nil`，什么也不做。
	 * + 内部的值不为`Nil`，值更改为`f(value)`。
	 */
	map<R>(f: (value: T) => R): Option<R> {
		if (this.inner == undefined || this.inner == null) {
			return new Option<R>();
		}
		else {
			return new Option(f(this.inner));
		}
	}


	/**
	 * 如何渲染页面。
	 * @param f 渲染函数，内部值不为空，调用起函数。
	 */
	render(f: (value: T) => ReactNode): ReactNode {
		if (this.inner == undefined || this.inner == null) {
			return null;
		}
		else {
			return f(this.inner);
		}
	}

	/**
	 * 占位元素。
	 * 如果为`Nil`，此元素会显示出来。
	 */
	placeholder(node: ReactNode): ReactNode {
		if (this.inner == undefined || this.inner == null) {
			return null;
		}
		else {
			return node;
		}
	}
}
