import React from "react";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import "./Message.css";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface IProps {
	name: string;
	text: string;
}

export const Message = (props: IProps) => {
	const { name, text } = props;
	const isMe = name === "me";
	const data: any = useSelector(
		(state: RootState) => state.auth.login.currentUser
	);
	return (
		<div className={`message ${isMe && "message-user"}`}>
			<div className="message-inline">
				<Avatar
					className="message-avatar"
					alt={isMe ? (data?.user?.name).toUpperCase() : "Bot"}
					src={
						isMe
							? (data?.user?.name).toUpperCase()
							: "Bot".toUpperCase()
					}
				/>
				<Card className={isMe ? "message-myCard" : "message-heraCard"}>
					<CardContent className="message-cardContent">
						<Typography
							className="message-typography"
							color="black"
							variant="h6"
							component="h2"
						>
							{text}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
