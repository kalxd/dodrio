import { useState, ChangeEvent, SetStateAction, Dispatch } from "react";

type Callback = (e: ChangeEvent<HTMLInputElement>) => void;

export default function useForm<T>(init: T): [
	T,
	{[I in keyof T]: Callback},
	Dispatch<SetStateAction<T>>]
{
	const [data, setData] = useState(init);

	type U = { [I in keyof T]: Callback };

	const setter: U =
		Object.entries(init)
			.reduce((acc, [key, _]) => {
				const callback = (e: ChangeEvent<HTMLInputElement>) => {
					const value = e.target.value.trim();
					setData({
						...data,
						[key]: value
					});
				};

				return Object.assign(acc, {
					[key]: callback
				});
			}, {} as U)
	;

	return [data, setter, setData];
}
