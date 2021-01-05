/**
 * 简易fetch客户端，仅对返回格式加以处理。
 */
export default async function(url, init) {
	const res = await fetch(url, init)
	const body = await res.json();

	if (res.ok) {
		return body;
	}
	else {
		throw new Error(body.msg);
	}
}
