import React from "react";
import { Loading } from "./Loading";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const Alert = () => {
	const { loading, error, currentUser }: any = useSelector(
		(state: RootState) => state.auth.login
	);
	return (
		<div>
			{loading && <Loading />}
			{error && loading}
		</div>
	);
};
