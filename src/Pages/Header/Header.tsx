import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
	const [user, setUser] = useState("thanhngo");

	return (
		<nav>
			<Link to={"/"}>CHAT GPT</Link>
			{user ? (
				<>
					<p>{user}</p>
					<Link to={"/"}>đăng xuất</Link>
				</>
			) : (
				<Link to={"/"}>Đăng nhập</Link>
			)}
		</nav>
	);
};
