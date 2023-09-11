import { Route, Routes } from "react-router-dom";
import { publicRouters } from "./utils/router.tag";
import { DefaultLayout } from "./Components";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const App = () => {
	return (
		<>
			<Routes>
				{publicRouters.map((route, index) => {
					const Page:
						| ((props: any) => JSX.Element)
						| (() => JSX.Element) = route.component;
					let Layout = DefaultLayout;

					if (route.layout === null) {
						Layout = Fragment;
					}

					return (
						<Route
							key={index}
							path={route.path}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
			</Routes>
			<ToastContainer
				position="bottom-left"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};

export default App;
