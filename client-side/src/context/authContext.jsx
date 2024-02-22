import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserStore from "../store/UserStore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { UserData, UserContextAPI } = UserStore();

	const [auth, setAuth] = useState({
		user: null,
		image: "",
		isLoggedIn: false,
		isBanned: false,
		token: "",
	});
	// axios.defaults.baseURL = "http://localhost:3000/api/v1";
	axios.defaults.baseURL =
		"https://tech-commerce-server-roan.vercel.app/api/v1";
	// axios.defaults.withCredentials = true;
	axios.defaults.headers.common["Authorization"] = auth?.token;

	useEffect(() => {
		const data = localStorage.getItem("auth");
		(async () => {
			if (!data) {
				// const data = await UserContextAPI();
				if (data) {
					const parsedData = JSON.parse(data);
					setAuth({
						...auth,
						user: parsedData?.user,
						image: parsedData?.image,
						isLoggedIn: true,
						isBanned: parsedData?.user?.isBanned,
						token: parsedData?.token,
					});
				} else {
					return;
				}
			} else {
				setAuth({
					...auth,
					isLoggedIn: false,
				});
				return;
			}
		})();
	}, []);

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
