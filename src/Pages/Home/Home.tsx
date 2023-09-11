import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import { BotChat } from "../BotChat";
import { Login } from "../Login";

export const Home = () => {
	const [user, setUser] = useState(true);

	return <>{user ? <Login /> : <BotChat />}</>;
};
