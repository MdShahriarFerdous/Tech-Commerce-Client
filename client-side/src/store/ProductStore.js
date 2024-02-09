import { create } from "zustand";
import axios from "axios";

const ProductStore = create((set) => ({
	isLoading: false,
	//*============================Brand-List===============================
	BrandList: null,
	BrandAPIError: null,
	BrandListAPI: async () => {
		try {
			const { data } = await axios.get("/product-brand-list");
			if (data.success) {
				set({
					BrandList: data.payload?.brandLists,
					BrandAPIError: null,
				});
			} else {
				set({
					BrandAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ BrandAPIError: error.message || "An error occurred" });
		}
	},
	//*============================Category-List===============================
	CategoryList: null,
	CategoryAPIError: null,
	CategoryListAPI: async () => {
		try {
			const { data } = await axios.get("/product-category-list");
			if (data.success) {
				set({
					CategoryList: data.payload?.categoryLists,
					CategoryAPIError: null,
				});
			} else {
				set({
					CategoryAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ CategoryAPIError: error.message || "An error occurred" });
		}
	},

	//*============================Slider-List===============================
	SliderList: null,
	SliderAPIError: null,
	SliderListAPI: async () => {
		try {
			const { data } = await axios.get("/product-slider-list");
			if (data.success) {
				set({
					SliderList: data.payload?.sliderLists,
					SliderAPIError: null,
				});
			} else {
				set({
					SliderAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ SliderAPIError: error.message || "An error occurred" });
		}
	},
	//*============================Product-by-Remark===============================
	ProductByRemark: null,
	RemarkAPIError: null,
	ProductRemarkAPI: async (remark) => {
		try {
			const { data } = await axios.get(
				`/product-list-by-remark/${remark}`
			);
			if (data.success) {
				set({
					ProductByRemark: data.payload?.listedByRemark,
					RemarkAPIError: null,
				});
			} else {
				set({
					RemarkAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ RemarkAPIError: error.message || "An error occurred" });
		}
	},
	//*============================Product-by-Brand===============================
	ProductList: null,
	ListByBrandError: null,
	ListByBrandAPI: async (brandId) => {
		try {
			const { data } = await axios.get(
				`/product-list-by-brand/${brandId}`
			);
			if (data.success) {
				set({
					ProductList: data.payload?.listedByBrandId,
					ListBrandAPIError: null,
				});
			} else {
				set({
					ListBrandAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ ListBrandAPIError: error.message || "An error occurred" });
		}
	},
	//*============================Product-by-Category===============================
	ListByCategoryError: null,
	ListByCategoryAPI: async (categoryId) => {
		try {
			const { data } = await axios.get(
				`/product-list-by-category/${categoryId}`
			);
			if (data.success) {
				set({
					ProductList: data.payload?.listedByCategoryId,
					ListCategoryAPIError: null,
				});
			} else {
				set({
					ListCategoryAPIError:
						data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ ListCategoryAPIError: error.message || "An error occurred" });
		}
	},
	//*=================Product-by-keyword-for (Searching)================
	ListBySearchError: null,
	ListBySearchAPI: async (keyword) => {
		try {
			const { data } = await axios.get(
				`/product-search-by-keyword/${keyword}`
			);
			if (data.success) {
				set({
					ProductList: data.payload?.searchedProduct,
					ListBySearchError: null,
				});
			} else {
				set({
					ListBySearchError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ ListBySearchError: error.message || "An error occurred" });
		}
	},

	//*=====================Filtering-Products========================
	FilterListError: null,
	ListByFilterAPI: async (postBody) => {
		set({ isLoading: true });
		try {
			const { data } = await axios.post(
				"/product-list-by-filter",
				postBody
			);
			if (data.success) {
				set({
					ProductList: data.payload?.filteredProduct,
					FilterListError: null,
					isLoading: false,
				});
			} else {
				set({
					FilterListError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ FilterListError: error.message || "An error occurred" });
		}
	},

	//*=====================Product's-Details-Show========================
	ProductDetails: null,
	ProductDetailsError: null,
	ProductDetailsAPI: async (productId) => {
		set({ isLoading: true });
		try {
			const { data } = await axios.get(`/product-details/${productId}`);
			if (data.success) {
				set({
					ProductDetails: data.payload?.productDetails,
					ProductDetailsError: null,
					isLoading: false,
				});
			} else {
				set({
					FilterListError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ FilterListError: error.message || "An error occurred" });
		}
	},

	//*=====================Product's-Review-Show========================
	ReviewList: null,
	ReviewListError: null,
	ReviewListAPI: async (productId) => {
		set({ isLoading: true });
		try {
			const { data } = await axios.get(
				`/product-review-list/${productId}`
			);
			if (data.success) {
				set({
					ReviewList: data.payload?.productReviewList,
					ReviewListError: null,
					isLoading: false,
				});
			} else {
				set({
					ReviewListError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ ReviewListError: error.message || "An error occurred" });
		}
	},
}));

export default ProductStore;
