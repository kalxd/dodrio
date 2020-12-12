import { sleep } from "./Util";

enum ST {
	INIT,
	POLLING,
	READY
};

/**
 * 仅初始一次的抽象类。
 * 简单的单例模式。
 */
export default abstract class CallOnce<T> {
	private inner: T | undefined;
	private st: ST;

	constructor(data?: T) {
		this.inner = data
		this.st = ST.INIT;
	}

	abstract async init(): Promise<T>;

	async get_data(): Promise<T> {
		while (true) {
			if (this.st == ST.READY) {
				return this.inner as T;
			}

			if (this.st == ST.INIT) {
				this.st = ST.POLLING;
				this.inner = await this.init();
				this.st = ST.READY;
			}
			await sleep(200);
		}
	}
}
