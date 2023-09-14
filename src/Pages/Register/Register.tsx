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
import { Loading } from "../../Alert";
export const Register = () => {
	const navagate = useNavigate();
	const [typePass, setTypePass] = useState(false);
	const [typeCFPass, setTypeCFPass] = useState(false);
	const submitRef = useRef<HTMLButtonElement>(null);
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
				submitRef.current!.disabled = true;
				toast.success(`${data.data.msg}`);
				navagate("/");
			},

			onError: (data: any) => {
				submitRef.current!.style.cursor = "initial";

				if (!name) {
					usernameRef.current?.focus();
				}
				if (data && data.response.status === 400) {
					submitRef.current!.disabled = true;
					toast.error(`${data.response.data.msg}`);
				}
				if (data && data.response.status === 500) {
					submitRef.current!.disabled = true;
					toast.error(`${data.response.statusText}`);
				}
			},
		});
	};

	useEffect(() => {
		usernameRef.current?.focus();
	}, []);

	useEffect(() => {
		let timeId = setInterval(() => {
			if (name && password && account && cf_password) {
				submitRef.current!.disabled = false;
				submitRef.current!.style.cursor = "pointer";
			}
		}, 5000);
		return () => {
			clearInterval(timeId);
		};
	}, [submitRef.current, name && password && account && cf_password]);
	useEffect(() => {
		if (name && password && account && cf_password) {
			submitRef.current!.style.cursor = "pointer";
		} else {
			submitRef.current!.style.cursor = "initial";
		}
	}, [name && password && account && cf_password]);
	return (
		<>
			{mutateAddStudent.isLoading && <Loading />}
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
					<div className="password">
						<input
							type={typePass ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Mật khẩu"
							className="input"
							value={password}
							onChange={handleChangeInput}
						/>
						<small
							onClick={() => setTypePass(!typePass)}
							className={`${userRegis.password ? "block" : ""}`}
						>
							{typePass ? "Ẩn" : "Hiện"}
						</small>
					</div>
					<div className="cf_password">
						<input
							type={typeCFPass ? "text" : "password"}
							name="cf_password"
							id="cf_password"
							placeholder="Xác nhận lại mật khẩu"
							className="input"
							value={cf_password}
							onChange={handleChangeInput}
						/>
						<small
							onClick={() => setTypeCFPass(!typeCFPass)}
							className={`${
								userRegis.cf_password ? "block" : ""
							}`}
						>
							{typeCFPass ? "Ẩn" : "Hiện"}
						</small>
					</div>

					<button
						className={`buttonregister ${
							name && password && account && cf_password
								? "pointerregister"
								: ""
						}`}
						disabled={
							name && password && account && cf_password
								? false
								: true
						}
						ref={submitRef}
					>
						Đăng Ký
					</button>
					<Link to={"/"} className="loginclick">
						Đăng nhập tài khoản
					</Link>
				</Paper>
			</form>
		</>
	);
};
