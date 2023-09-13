import React from "react";
import { Header } from "../../Pages";
import { Alert } from "../../Alert";

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
			<Alert />
			{children}
		</div>
	);
};
