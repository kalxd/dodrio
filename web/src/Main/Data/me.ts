import { createContext, Context, Dispatch, SetStateAction } from "react";
import PageResult from "../../lib/PageResult";
import Option from "../../lib/Option";

/**
 * 用户基本信息。
 */
export interface MeType {
	readonly id: number;
	readonly 账号: number;
	用户名: number|undefined;
	电子邮箱: number;
	readonly 创建日期: Date;
}

export class FetchF {
	token: string | undefined;

	constructor(token: string | undefined) {
		this.token = token;
	}

	private fetch<T>(info: RequestInfo, inits: RequestInit): Promise<T> {
		let option = Object.assign({}, inits, {
			headers: {
				"Context-Type": "Application/json",
				"DODRIO-TOKEN": this.token
			}
		});

		return fetch(info, option)
			.then(r => r.json())
		;
	}

	async get<T>(info: RequestInfo): Promise<T> {
		const init = {
			method: "GET"
		};
		return this.fetch(info, init);
	}

	async post<T, B>(info: RequestInfo, body?: B) {
		const init = {
			method: "GET",
			body: JSON.stringify(body)
		};

		return this.fetch(info, init);
	}

	async put<T, B>(info: RequestInfo, body?: B) {
		const init = {
			method: "GET",
			body: JSON.stringify(body)
		};

		return this.fetch(info, init);
	}

	async del<T>(info: RequestInfo) {
		const init = {
			method: "DELETE"
		};

		return this.fetch(info, init);
	}
}

/**
 * 最传入Context Provider的类型。
 */
export interface MeValue {
	me: PageResult<Option<MeType>>;
	setMe: Dispatch<SetStateAction<PageResult<Option<MeType>>>>;
	Fetch: FetchF;
}

export const MeContext: Context<MeValue>
	= createContext({} as MeValue);
