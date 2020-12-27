import { useState, ChangeEvent, SetStateAction, Dispatch } from "react";

export default function useForm<T>(init: T): [
	T,
	{[I in keyof T]: ((e: ChangeEvent<HTMLInputElement>) => void)},
	Dispatch<SetStateAction<T>>]
{
	const [data, setData] = useState(init);

	let m = {};
	for (const a in init) {
		const attr = a.replace(/^\w/, c => c.toUpperCase());
		const method = `set${attr}`;
		m[method] = (e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim();
			setData({
				...data,
				[a]: value
			})
		};
	}

	return [data, m, setData];
}
