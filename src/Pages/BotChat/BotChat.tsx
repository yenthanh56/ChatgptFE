import { useState, useEffect, useRef } from "react";
import { FormControl, Input, IconButton } from "@mui/material";
import PulseLoader from "react-spinners/PulseLoader";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "../../Components";
import { generateUID } from "../../utils/generateId";
import {
	MutationCache,
	QueryClient,
	useMutation,
	useQueries,
	useQueryClient,
} from "@tanstack/react-query";
import { loginUser } from "../../apis/FetchApi";
import { IAuthLogin, IAuthLogin1 } from "../../types/authLogin.type";
import { useIsFetching } from "@tanstack/react-query";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { IUser } from "../../types/users.type";
import "./BotChat.css";
import Button from "@mui/material/Button";
interface IProps {
	setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BotChat = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const data: any = useSelector(
		(state: RootState) => state.auth.login.currentUser
	);

	const [prompt, setPrompt] = useState("");

	const [messages, setMessages] = useState([
		{
			id: generateUID(),
			name: "Bot",
			text: "Xin chào,bạn có muốn hỏi tôi gì không?💁‍♀️",
		},
	]);

	const [isLoading, setisLoading] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	const override = {
		display: "block",
		margin: "0 auto",
		borderColor: "red",
	};
	const sendPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setMessages((prevMessages) => [
			...prevMessages,
			{ id: generateUID(), name: "me", text: prompt },
		]);
		setPrompt("");
		setisLoading(true);

		await fetch("http://localhost:3000/v1/bot", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: prompt }),
		})
			.then((res) => res.json())
			.then((data) =>
				setMessages((prevMessages) => [
					...prevMessages,
					{
						id: generateUID(),
						name: "Bot",
						text: data.bot,
					},
				])
			);

		setisLoading(false);
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	return (
		<div
			style={{
				padding: "0 40px 40px 40px",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1>{data?.user?.name}</h1>
				<Button
					variant="contained"
					onClick={() => logout(dispatch, navigate)}
				>
					Đăng xuất
				</Button>
			</div>

			<div className="message-container">
				<div className="message-main">
					{messages.map((message) => (
						<Message
							key={message.id}
							name={message.name}
							text={message.text}
						/>
					))}
					<PulseLoader
						color="#0b81ff"
						loading={isLoading}
						cssOverride={override}
						size={30}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
					<div ref={bottomRef} />
				</div>
				<form className="app-form" onSubmit={sendPrompt}>
					<FormControl className="app-formControl"></FormControl>
					<Input
						className="app-input"
						placeholder="Hãy hỏi mình bất kì điều gì!"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
					/>

					<IconButton
						type="button"
						color="primary"
						className="app-iconButton"
					>
						<SendIcon />
					</IconButton>
				</form>
			</div>

			{/* small chat input */}
		</div>
	);
};
