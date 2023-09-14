import React from "react";
import "./PageNotFound.css";
import images from "../../assests";
import { Link } from "react-router-dom";
export const PageNotFound = () => {
	return (
		<div className="pagenotfound">
			<div className="pagenot">
				<img src={images.logo} alt="wrong" />
				<h1>Trang không tồn tại</h1>
				<button className="buttonnotfound">
					<Link to="/">Tải lại trang</Link>
				</button>
			</div>
		</div>
	);
};
