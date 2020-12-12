/**
 * 公用工具类函数。
 */

/**
 * 休眼一段时间。
 * @param duration 休眼多少毫秒。
 */
export const sleep = async (duration: number) => {
	return new Promise(resolve => {
		setTimeout(resolve, duration);
	});
};
