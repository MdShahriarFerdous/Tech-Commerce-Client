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
	});

	axios.defaults.baseURL = "https://tech-commerce-server-roan.vercel.app/api/v1";
	axios.defaults.withCredentials = true;

	useEffect(() => {
		(async () => {
			if (!UserData) {
				const data = await UserContextAPI();
				setAuth({
					...auth,
					user: data.user,
					image: data.image,
					isLoggedIn: true,
					isBanned: data.user?.isBanned,
				});
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
