import { create } from "zustand";
import axios from "axios";

const CartStore = create((set) => ({
	AddToCartLoading: false,
	CartCountLoading: false,

	//*===============================Cart-Form-OnChange==================================
	CartForm: { productId: "", color: "", qty: 0, size: "" },
	CartFormOnChange: (e) => {
		const { name, value } = e.target;
		set((state) => ({
			CartForm: {
				...state.CartForm,
				[name]: value,
			},
		}));
	},

	//*===============================Add-to-Cart-API==================================
	AddToCartAPI: async (postBody, productId) => {
		set({ AddToCartLoading: true });

		try {
			postBody.productId = productId;
			const { data } = await axios.post("/save-to-cartlist", postBody);
			if (data.success) {
				set({ AddToCartLoading: false });
				return data.message === "Save to Cart Successfully!";
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

	//*===============================Show-Cart-Lists==================================
	CartList: null,
	CartListCount: 0,
	ResetCartListCount: () => {
		set({ CartListCount: 0 });
	},
	CartListAPI: async () => {
		set({ CartCountLoading: true });
		try {
			const { data } = await axios.get("/get-cartlist");
			if (data.success) {
				set({ CartCountLoading: false });
				set({ CartList: data.payload?.cartListData });
				set({ CartListCount: (data.payload?.cartListData).length });
			}
			// console.log(CartListCount);
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

export default CartStore;
