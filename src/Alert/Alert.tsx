import React from "react";
import { Loading } from "./Loading";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useMutation } from "@tanstack/react-query";
import { IAuthRegister } from "../types/authRegister.type";
import { regisUser } from "../apis/FetchApi";

export const Alert = () => {
	const { loading, error, currentUser }: any = useSelector(
		(state: RootState) => state.auth.login
	);
	const { isLoading } = useMutation({
		mutationFn: (body: IAuthRegister) => {
			return regisUser(body);
		},
	});
	return (
		<div>
			{(loading || isLoading) && <Loading />}
			{/* {isLoading && <Loading />} */}
			{error && loading}
		</div>
	);
};
