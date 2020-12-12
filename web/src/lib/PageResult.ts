/**
 * 页面的多种状态泛型类。
 */
import React from "react";

enum ST {
    LOADING,
    OK,
    ERR,
}

/**
 * 最朴素的页面状态类型。
 * 提供三种状态：处理中、处理成功、处理失败。
 * 内部尚不涉及界面处理。
 */
export default class PageResult<T> {
	private st: ST;
	private inner: T | undefined;
	private err: string | undefined;

	constructor(data?: T) {
		this.inner = data;
		this.st = ST.LOADING;
		this.err = undefined;
	}

	/**
	 * 状态设为_成功_。
	 */
	set_ok(data: T): this {
		this.inner = data;
		this.st = ST.OK;
		this.err = undefined;
		return this;
	}

	/**
	 * 状态设为_处理中_。
	 */
	set_loading(): this {
		this.inner = undefined;
		this.st = ST.LOADING;
		this.err = undefined;
		return this;
	}

	/**
	 * 状态设为_失败_。
	 */
	set_err(err: string): this {
		this.inner = undefined;
		this.st = ST.ERR;
		this.err = err;
		return this;
	}

	/**
	 * 仅对成功状态下的界面进行渲染。
	 * 其他状态都返回一个空无素。
	 * @params f 渲染函数，内部是什么，它的参数就是什么。
	 */
	map(f: (data: T) => React.ReactNode): React.ReactNode {
		if (this.st == ST.OK) {
			return f(this.inner as T);
		}
		else {
			return null;
		}
	}

	/**
	 * 渲染出错误。
	 * @params f 一个普通的渲染函数。
	 */
	map_err(f: (err: string) => React.ReactNode): React.ReactNode {
		if (this.st == ST.ERR) {
			return f(this.err as string);
		}
		else {
			return null;
		}
	}

	is_ok(): boolean {
		return this.st == ST.OK;
	}

	is_loading(): boolean {
		return this.st == ST.LOADING;
	}

	is_err(): boolean {
		return this.st == ST.ERR;
	}
}
