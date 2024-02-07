import { create } from "zustand";
import axios from "axios";

const FeatureStore = create((set) => ({
	featureList: null,
	featureAPIError: null,
	featureListAPI: async () => {
		try {
			const { data } = await axios.get("/get-feature-list");
			if (data.success) {
				set({
					featureList: data.payload?.featureListData,
					featureAPIError: null,
				});
			} else {
				set({
					featureAPIError: data.message || "Something went wrong",
				});
			}
		} catch (error) {
			set({ featureAPIError: error.message || "An error occurred" });
		}
	},
}));

export default FeatureStore;

/**
 * usage: 
 * const { featureList, featureAPIError } = useStore(FeatureStore);
if (featureAPIError) {
  console.log(featureAPIError);
  toast.error("Error in featurelist fetching")
} else if (featureList) {
  // Render feature list
} else {
  // Loading state or initial state
}
 */
