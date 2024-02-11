import { create } from "zustand";
import axios from "axios";
import { getBasicUserData } from "../utility/utility";

const UserStore = create((set) => ({
	BasicUser: null,
	Loading: false,
	//*===============================User-Register==================================
	registerError: null,
	UserRegisterAPI: async (postBody) => {
		set({ Loading: true });
		try {
			const { data } = await axios.post("/user-register", postBody);

			if (data.success) {
				set({
					BasicUser: data.payload?.BasicUser,
					registerError: null,
				});
				localStorage.setItem("basic-user", JSON.stringify(BasicUser));
				set({ Loading: false });
			} else {
				set({
					registerError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ registerError: error.message || "An error occurred" });
		}
	},

	//*===============================User-Verify==================================
	UserData: null,
	verifyError: null,
	UserVerifyAPI: async (OTP) => {
		set({ Loading: true });
		try {
			const { data } = await axios.post("/user-verify", OTP);
			if (data.success) {
				set({
					UserData: data.payload, //UserData.user, UserData.userImage
					verifyError: null,
				});
				localStorage.removeItem("basic-user");
				set({ Loading: false });
			} else {
				set({
					verifyError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ verifyError: error.message || "An error occurred" });
		}
	},

	//*===============================Resend-OTP==================================
	otpAPIError: null,
	ResendOTPAPI: async (BasicUser) => {
		set({ Loading: true });
		const { username, email, password } = BasicUser;
		try {
			const { data } = await axios.get(
				`/resend-otp/${username}/${email}/${password}`
			);
			if (data.success) {
				set({
					BasicUser: data.payload?.BasicUser,
					otpAPIError: null,
				});
				localStorage.setItem("basic-user", JSON.stringify(BasicUser));
				set({ Loading: false });
			} else {
				set({
					otpAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ otpAPIError: error.message || "An error occurred" });
		}
	},

	//*===============================Changed-BasicUSer-mail==================================
	AlterMailResendAPI: async (resendEmail) => {
		set({ Loading: true });
		const { username, password } = getBasicUserData();
		let email = resendEmail;

		localStorage.removeItem("basic-user");

		try {
			const { data } = await axios.get(
				`/resend-otp/${username}/${email}/${password}`
			);
			if (data.success) {
				set({
					BasicUser: data.payload?.BasicUser,
					otpAPIError: null,
				});
				localStorage.setItem("basic-user", JSON.stringify(BasicUser));
				set({ Loading: false });
			} else {
				set({
					otpAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ otpAPIError: error.message || "An error occurred" });
		}
	},
}));

export default UserStore;
