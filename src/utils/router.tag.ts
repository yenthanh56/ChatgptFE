import { BotChat, Home, Login, PageNotFound, Register } from "../Pages";

export const publicRouters = [
	{ path: "/", component: Home },
	{ path: "/botchat", component: BotChat },
	// user
	{ path: "/login", component: Login, layout: null },
	{ path: "/register", component: Register, layout: null },
	// page *
	{ path: "*", component: PageNotFound },
];
