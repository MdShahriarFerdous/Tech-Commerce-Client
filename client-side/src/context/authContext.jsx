import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		image: "",
		isLoggedIn: false,
		isBanned: false,
	});

	axios.defaults.baseURL = "http://localhost:3000/api/v1";
	// axios.defaults.withCredentials = true;

	// useEffect(() => {
	// 	if (auth.isLoggedIn === false) {
	// 		fetchLoggedUserData();
	// 	}
	// }, []);

	// const fetchLoggedUserData = async () => {
	// 	try {
	// 		const { data } = await axios.get("/user-context-data");

	// 		if (
	// 			!data ||
	// 			data.status === "Login Again" ||
	// 			data.status === "Fail"
	// 		) {
	// 			setAuth({
	// 				...auth,
	// 				isLoggedIn: false,
	// 			});
	// 		}

	// 		if (data.status === "Banned") {
	// 			setAuth({
	// 				...auth,
	// 				isLoggedIn: false,
	// 				isBanned: true,
	// 			});
	// 		}

	// 		if (data.success && data.payload?.protected) {
	// 			setAuth({
	// 				...auth,
	// 				user: data.payload.user,
	// 				image: data.payload.image,
	// 				isLoggedIn: true,
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log(error.message);
	// 	}
	// };

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	return useContext(AuthContext);
};

export { useAuth, AuthProvider };
