import axios from "axios";
import { IAuthLogin } from "../types/authLogin.type";
import http from "../utils/http";
import { IAuthRegister } from "../types/authRegister.type";
import { IUser } from "../types/users.type";

export const loginUser = (body: IAuthLogin, token?: string) =>
	http.post<IAuthLogin>("v1/user/login", body, {
		headers: { Authorization: token },
	});
export const regisUser = (body: IAuthRegister) =>
	http.post<IAuthRegister>("v1/user/register", body);

export const logoutUser = () => http.get("v1/user/logout");
