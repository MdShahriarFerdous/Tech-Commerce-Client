import { create } from "zustand";
import axios from "axios";

const WishStore = create((set) => ({
	AddToWishLoading: false,
	WishCountLoading: false,

	//*===============================Add-to-wish-API==================================
	AddToWishAPI: async (productId) => {
		set({ AddToWishLoading: true });

		try {
			const { data } = await axios.post("/save-to-wishlist", {
				productId,
			});
			if (data.success) {
				set({ AddToWishLoading: false });
				return data.message === "Wishlist Product Added Successfully";
			}
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.status === 400
			) {
				return false; //navigate to login
			}
		}
	},

	//*===============================Show-Wish-Lists==================================
	WishList: null,
	WishListCount: 0,
	ResetWishListCount: () => {
		set({ WishListCount: 0 });
	},
	WishListAPI: async () => {
		set({ WishCountLoading: true });
		try {
			const { data } = await axios.get("/get-wishlist");
			if (data.success) {
				set({ WishCountLoading: false });
				set({ WishList: data.payload?.wishListData });
				set({ WishListCount: (data.payload?.wishListData).length });
			}
		} catch (error) {
			if (
				error.response.status === 401 ||
				error.response.status === 400
			) {
				return false; //navigate to login
			}
		}
	},
}));

export default WishStore;
