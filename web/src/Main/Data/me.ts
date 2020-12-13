import { createContext, Context } from "react";
import PageResult from "../../lib/PageResult";
import Option from "../../lib/Option";

export interface MeType {
	readonly id: number;
	readonly 账号: number;
	用户名: number|undefined;
	电子邮箱: number;
	readonly 创建日期: Date;
}

export const MeContext: Context<PageResult<Option<MeType>>>
	= createContext(new PageResult());
