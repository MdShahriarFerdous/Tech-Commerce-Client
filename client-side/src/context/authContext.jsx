import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import UserStore from "../store/UserStore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const { UserData, UserContextAPI } = UserStore();
	const [auth, setAuth] = useState({
		user: UserData ? UserData.user : null,
		image: UserData ? UserData.userImage : "",
		isLoggedIn: false,
		isBanned: UserData ? UserData.user?.isBanned : false,
	});

	axios.defaults.baseURL = "http://localhost:3000/api/v1";
	// axios.defaults.baseURL = "https://tech-commerce-vfwj.onrender.com/api/v1";
	axios.defaults.withCredentials = true;

	useEffect(() => {
		(async () => {
			if (!UserData) {
				const msg = await UserContextAPI();
				if (msg) {
					setAuth({
						...auth,
						user: UserData?.user,
						image: UserData?.userImage,
						isLoggedIn: true,
						isBanned: UserData?.user?.isBanned,
					});
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
