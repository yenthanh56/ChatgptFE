import React, { useState, useRef, useEffect } from "react";
import { IAuthRegister } from "../../types/authRegister.type";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { regisUser } from "../../apis/FetchApi";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
export const Register = () => {
	const navagate = useNavigate();
	const usernameRef = useRef<HTMLInputElement>(null);
	const initialState: IAuthRegister = {
		name: "",
		account: "",
		password: "",
		cf_password: "",
	};
	const [userRegis, setUserRegis] = useState(initialState);
	const { name, account, password, cf_password } = userRegis;

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserRegis({ ...userRegis, [e.target.name]: e.target.value });
	};

	const mutateAddStudent = useMutation({
		mutationFn: (body: IAuthRegister) => {
			return regisUser(body);
		},
	});
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutateAddStudent.mutate(userRegis, {
			onSuccess: (data) => {
				toast.success(`${data.data.msg}`);
				navagate("/");
			},

			onError: (data: any) => {
				if (!name) {
					usernameRef.current?.focus();
				}
				if (data && data.response.status === 400) {
					toast.error(`${data.response.data.msg}`);
				}
				if (data && data.response.status === 500) {
					toast.error(`${data.response.statusText}`);
				}
			},
		});
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
					<Typography variant="h5">Đăng ký tài khoản</Typography>

					<input
						type="text"
						name="name"
						id="name"
						placeholder="Tên đăng nhập"
						className="input"
						value={name}
						ref={usernameRef}
						onChange={handleChangeInput}
					/>

					<input
						type="text"
						name="account"
						id="account"
						placeholder="Địa chỉ email"
						className="input"
						value={account}
						onChange={handleChangeInput}
					/>

					<input
						type="password"
						name="password"
						id="password"
						placeholder="Mật khẩu"
						className="input"
						value={password}
						onChange={handleChangeInput}
					/>

					<input
						type="password"
						name="cf_password"
						id="cf_password"
						placeholder="Xác nhận lại mật khẩu"
						className="input"
						value={cf_password}
						onChange={handleChangeInput}
					/>

					<button className="button">Đăng nhập</button>
					<Link to={"/"}>Đăng nhập tài khoản</Link>
				</Paper>
			</form>
		</>
	);
};
