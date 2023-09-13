import React from "react";
import { IAuthLogin } from "../types/authLogin.type";

export const UseDebounce = (
	fn: (userLogin: IAuthLogin, dispatch: any, navigate: any) => void,
	delay: number
) => {
	delay = delay | 0;
	let timeId: number | null | ReturnType<typeof setTimeout>;
	return () => {
		if (timeId) {
			clearTimeout(timeId);
			timeId = null;
		}

		timeId = setTimeout(
			(userLogin: IAuthLogin, dispatch: any, navigate: any) => {
				fn(userLogin, dispatch, navigate);
			},
			delay
		);
	};
};
