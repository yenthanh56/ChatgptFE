import { BotChat, Home, Login, Register } from "../Pages";

export const publicRouters = [
	{ path: "/", component: Home },
	{ path: "/botchat", component: BotChat },
	// user
	{ path: "/login", component: Login, layout: null },
	{ path: "/register", component: Register, layout: null },
];
