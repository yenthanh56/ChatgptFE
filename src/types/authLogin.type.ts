import { IUser } from "./users.type";

export interface IAuthLogin {
	user?: object;
	name: string;
	password?: string;
	msg?: string;
}
export interface IAuthLogin1 {
	user: {
		name: string;
		password?: string;
		msg?: string;
	} | null;
	name: string;
	password?: string;
	msg?: string;
}
