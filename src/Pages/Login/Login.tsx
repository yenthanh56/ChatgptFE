import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { login } from "../../store/authSlice";
import { useAppDispatch } from "../../store/store";
import { Paper } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const passRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const initialState = {
		name: "",
		password: "",
	};
	const [userLogin, setUserLogin] = useState(initialState);
	const { name, password } = userLogin;
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
	};
	// react-query
	// const mutateAddStudent = useMutation({
	// 	mutationKey: ["user"],
	// 	mutationFn: (body: IAuthLogin, token?: string) => {
	// 		return loginUser(body, token);
	// 	},
	// });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// react-query
		// mutateAddStudent.mutate(userLogin, {
		// 	onSuccess: (data) => {
		// 		toast.success(`${data.data.msg}`);
		// 		props.setUser(false);
		// 	},

		// 	onError: (data: any) => {
		// 		if (data && data.response.status === 400) {
		// 			toast.error(`${data.response.data.msg}`);
		// 		}
		// 		if (data && data.response.status === 500) {
		// 			toast.error(`${data.response.statusText}`);
		// 		}
		// 	},
		// });
		if (!name || name.length < 6) {
			usernameRef.current?.focus();
		}

		login(userLogin, dispatch, navigate);
	};

	useEffect(() => {
		usernameRef.current?.focus();
	}, []);

	return (
		<>
			<form
				onSubmit={handleSubmit}
				style={{
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Paper
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						padding: "40px",
						gap: "30px",
					}}
				>
					<Typography variant="h5">Đăng nhập tài khoản</Typography>

					<input
						type="text"
						name="name"
						id="name"
						placeholder="Tên đăng nhập"
						ref={usernameRef}
						value={name}
						onChange={handleChangeInput}
						className="input"
					/>

					<input
						type="password"
						name="password"
						id="password"
						placeholder="Mật khẩu"
						value={password}
						ref={passRef}
						onChange={handleChangeInput}
						className="input"
					/>

					<input type="submit" value="Đăng nhập" className="button" />
					<Link to={"/register"}>Đăng ký tài khoản</Link>
				</Paper>
			</form>
		</>
	);
};
