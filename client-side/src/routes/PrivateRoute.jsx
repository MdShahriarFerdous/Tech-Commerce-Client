// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import CounterLoader from "../components/counterloader/CounterLoader";
// import { useAuth } from "../context/authContext";

// const PrivateRoute = () => {
// 	const [hasToken, setHasToken] = useState(false);
// 	const [auth] = useAuth();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (auth?.isLoggedIn && !auth?.isBanned) {
// 			setHasToken(true);
// 		} else if (auth?.isLoggedIn && auth?.isBanned) {
// 			navigate("/banned");
// 		} else {
// 			setHasToken(false);
// 		}
// 	}, [auth?.isLoggedIn]);

// 	return hasToken ? <Outlet /> : <CounterLoader />;
// };

// export default PrivateRoute;
