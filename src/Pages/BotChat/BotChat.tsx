import { useState, useEffect, useRef } from "react";
import { FormControl, Input, IconButton } from "@mui/material";
import PulseLoader from "react-spinners/PulseLoader";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "../../Components";
import { generateUID } from "../../utils/generateId";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import "./BotChat.css";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

export const BotChat = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const data: any = useSelector(
		(state: RootState) => state.auth.login.currentUser
	);
	const inputRef = useRef<HTMLInputElement>(null);

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

		await fetch("https://chatgpt-be.vercel.app/v1/bot", {
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
		inputRef.current?.focus();
	});

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		if (!data?.user?.name.toUpperCase()) {
			navigate("/");
		}
	}, []);
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
				<h1>{data?.user?.name.toUpperCase()}</h1>
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
					<input
						className="app-input"
						placeholder="Hãy hỏi mình bất kì điều gì!"
						ref={inputRef}
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
					/>
					<button
						style={{ border: "none" }}
						disabled={prompt && messages ? false : true}
					>
						<IconButton
							type="button"
							color="primary"
							className="app-iconButton"
						>
							<SendIcon />
						</IconButton>
					</button>
				</form>
			</div>

			{/* small chat input */}
		</div>
	);
};
