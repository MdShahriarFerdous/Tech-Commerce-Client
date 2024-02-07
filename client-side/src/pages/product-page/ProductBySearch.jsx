import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AliasProductList from "../../components/product/AliasProductList";
import ProductsSkeleton from "../../skeletons/ProductsSkeleton";

const ProductBySearch = () => {
	const { ListBySearchError, ListBySearchAPI } = ProductStore();
	const { keyword } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await ListBySearchAPI(keyword);
			} catch (error) {
				console.error("Error fetching search data:", error);
			}
		})();
	}, [keyword]);

	if (ListBySearchError !== null) {
		console.log(ListBySearchError);
		return (
			<Layout>
				<ProductsSkeleton />
			</Layout>
		);
	} else {
		return (
			<Layout>
				<AliasProductList />
			</Layout>
		);
	}
};

export default ProductBySearch;
