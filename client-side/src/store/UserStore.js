import { create } from "zustand";
import axios from "axios";
import { getBasicUserData, unauthorized } from "../utility/utility";
import toast from "react-hot-toast";

const UserStore = create((set) => ({
	BasicUser: null,
	UserData: null,
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
				localStorage.setItem(
					"basic-user",
					JSON.stringify(data.payload?.BasicUser)
				);
				set({ Loading: false });
				return true;
			} else {
				set({ Loading: false });
				set({
					registerError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ registerError: error.message || "An error occurred" });
		}
	},

	//*===============================User-Verify==================================
	verifyError: null,
	UserVerifyAPI: async (OTP) => {
		set({ Loading: true });
		let postBody = { OTP: OTP };
		try {
			const { data } = await axios.post("/user-verify", postBody);
			if (data.success) {
				set({
					UserData: data.payload, //UserData.user, UserData.userImage
					verifyError: null,
				});
				localStorage.removeItem("basic-user");
				set({ Loading: false });
				return data.payload;
			} else {
				set({ Loading: false });
				set({
					verifyError: data.error || "Something went wrong",
				});
				toast.error(data.error);
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

	//*===============================User-Login==================================
	LogInError: null,
	UserLogInAPI: async (postBody) => {
		set({ Loading: true });
		try {
			const { data } = await axios.post("/user-login", postBody);
			if (data.success) {
				set({
					UserData: data.payload, //UserData.user, UserData.userImage
					LogInError: null,
				});
				set({ Loading: false });
				return data.payload;
			} else if (data.message) {
				set({ Loading: false });
			} else {
				set({ Loading: false });
				set({
					LogInError: data.error || "Something went wrong",
				});
			}
		} catch (error) {
			set({ LogInError: error.message || "An error occurred" });
		}
	},

	//*===============================User-Context-Data==================================
	contextError: null,
	UserContextAPI: async () => {
		try {
			const { data } = await axios.get("/user-context-data");
			if (data.success) {
				return data.payload;
			} else {
				set({
					contextError: data.error || "Something went wrong",
				});
			}
		} catch (error) {
			set({ contextError: error.message || "An error occurred" });
		}
	},

	//*===============================User-Logout==================================
	LogoutError: null,
	UserLogoutAPI: async () => {
		try {
			const { data } = await axios.get("/user-logout");
			if (data.success) {
				set({
					UserData: null,
					LogoutError: null,
				});
			} else if (data.message) {
				toast.error(data.message);
			} else {
				set({
					LogoutError: data.error || "Something went wrong",
				});
				toast.error(data.error);
			}
		} catch (error) {
			set({ LogoutError: error.message || "An error occurred" });
		}
	},

	//*===============================Profile-Input-Form-OnChange==================================
	ProfileFormData: {
		cus_add: "",
		cus_city: "",
		cus_country: "",
		cus_fax: "",
		cus_name: "",
		cus_phone: "",
		cus_postcode: "",
		cus_state: "",
		ship_add: "",
		ship_city: "",
		ship_country: "",
		ship_name: "",
		ship_phone: "",
		ship_postcode: "",
		ship_state: "",
	},
	ProfileFormChange: (e) => {
		const { name, value } = e.target;
		set((state) => ({
			ProfileFormData: {
				...state.ProfileFormData,
				[name]: value,
			},
		}));
	},

	//*===============================Profile-Form-Details-Show==================================
	FormDetailsLoading: false,
	ProfileFormDetails: null,
	ProfileDetailsReadAPI: async () => {
		set({ FormDetailsLoading: true });
		try {
			const { data } = await axios.get("/get-user-profile");
			if (data.success) {
				set({
					ProfileFormDetails: data.payload?.fetchedUserProfile[0],
				});
				set({ ProfileFormData: data.payload?.fetchedUserProfile[0] });
				set({ FormDetailsLoading: false });
			} else {
				set({ ProfileFormDetails: [] });
			}
		} catch (error) {
			unauthorized(error.response.status);
			return false;
		}
	},

	//*===============================Profile-Update==================================
	ProfileUpdateAPI: async (postBody) => {
		set({ FormDetailsLoading: true });
		try {
			set({ ProfileFormDetails: null });
			const { data } = await axios.put("/update-profile", postBody);
			if (data.success) {
				set({ FormDetailsLoading: false });
				return data.payload?.updatedMessage === "Updated";
			}
		} catch (error) {
			unauthorized(error.response.status);
		}
	},

	//*===============================User-Image-Update==================================
	ImageLoader: false,
	UserImage: "",
	UserImageUpdateAPI: async (imageData) => {
		set({ ImageLoader: true });
		try {
			const { data } = await axios.put(
				"/update-profile-image",
				imageData
			);
			if (data.success) {
				set({ UserImage: data.payload?.userImage });
				set({ ImageLoader: false });
				return true;
			}
		} catch (error) {
			unauthorized(error.response.status);
		}
	},
}));

export default UserStore;
