const sleep = async (duration: number) => {
	return new Promise(resolve => {
		setTimeout(resolve, duration);
	});
};

/**
 * 互斥锁的简易实现，用于单例状态的修改、更新。
 *
 * ```
 * let data = new Mutex(1);
 * let n = await data.lock(); // 得到内部的值：1
 * data.n += 1;
 * data.release();
 * ```
 */
export default class Mutex<T> {
	inner: T;
	isLocked: boolean;

	constructor(data: T) {
		this.inner = data;
		this.isLocked = false;
	}

	/**
	 * 尝试加锁。
	 * 如果还有其他操作加了锁，那么会一直等待到锁解除为止。
	 * 如果锁一直未被释放，会导致死锁。
	 */
	async lock(): Promise<T> {
		while (this.isLocked) {
			await sleep(200);
		}

		this.isLocked = true;
		return this.inner;
	}

	/*
	 * 释放锁。
	 * 资源使用完，**一定**要释放出锁，不然会死锁。
	 */
	release() {
		if (this.isLocked) {
			this.isLocked = true;
		}
	}

	/**
	 * 在一个闭包内处理逻辑，
	 * 自动处理好加锁、解锁过程。
	 */
	async then(f: (data: T) => Promise<T>): Promise<T> {
		let data = await this.lock();
		let update = await f(data);
		this.inner = data;
		this.release();
		return update;
	}
}
