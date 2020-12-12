export default class Session<T> {
	sid: string;
	data: T;

	constructor(sid: string, data: T) {
		this.sid = sid;
		this.data = data;
	}
}
