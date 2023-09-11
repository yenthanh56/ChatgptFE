import { createSlice } from "@reduxjs/toolkit";
import { IAuthLogin } from "../types/authLogin.type";
import { loginUser, logoutUser } from "../apis/FetchApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AuthState {
	login: {
		currentUser: null;
		loading: boolean;
		error: boolean;
		success: boolean;
	};
}

const initialState: AuthState = {
	login: {
		currentUser: null,
		loading: false,
		error: false,
		success: false,
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state) => {
			state.login.loading = true;
		},
		setLogin: (state, action) => {
			state.login.currentUser = action.payload;
			state.login.loading = false;
			state.login.success = true;
		},
		setError: (state) => {
			state.login.loading = false;
			state.login.error = true;
		},
		setLogout: (state) => {
			state.login.currentUser = null;

			state.login.loading = false;
			state.login.error = false;
			state.login.success = false;
		},
	},
});

export const { setLoading, setLogin, setError, setLogout } = authSlice.actions;

export default authSlice.reducer;

export const login = async (body: IAuthLogin, dispatch: any, navigate: any) => {
	dispatch(setLoading());
	try {
		const res = await loginUser(body);
		dispatch(setLogin(res.data));
		toast.success(res.data.msg);
		navigate("/botchat");
	} catch (error: any) {
		console.log(error);
		if (error && error.response.status === 400) {
			toast.error(`${error.response.data.msg}`);
			return;
		}
		if (error && error.response.status === 401) {
			toast.error(`${error.response.data.msg}`);
			return;
		}
		if (error && error.response.status === 500) {
			toast.error(`${error.response.statusText}`);
			return;
		}
		dispatch(setError());
	}
};
export const logout = async (dispatch: any, navigate: any) => {
	try {
		const res = await logoutUser();
		dispatch(setLogout(res.data.msg));
		toast.success(res.data.msg);
		navigate("/");
	} catch (error) {
		dispatch(setError());
	}
};
