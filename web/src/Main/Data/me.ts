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

/**
 * 最传入Context Provider的类型。
 */
export interface MeValue {
	me: PageResult<Option<MeType>>;
	setMe: Dispatch<SetStateAction<PageResult<Option<MeType>>>>;
}

export const MeContext: Context<MeValue>
	= createContext({} as MeValue);
