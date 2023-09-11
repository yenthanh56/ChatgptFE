import React from "react";
import { Header } from "../../Pages";

interface Props {
	children: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<div>
			{/* <Header /> */}
			{children}
		</div>
	);
};
