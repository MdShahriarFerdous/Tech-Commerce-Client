import { useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";

const Layout = lazy(() => import("../../components/layout/Layout"));
const AliasProductList = lazy(() =>
	import("../../components/product/AliasProductList")
);
import ProductsSkeleton from "../../skeletons/ProductsSkeleton";
import FallbackLoader from "../../components/fallback-loader/FallbackLoader";

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
	}

	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				{ListBySearchError !== null ? (
					<>
						<ProductsSkeleton />
					</>
				) : (
					<AliasProductList />
				)}
			</Layout>
		</Suspense>
	);
};

export default ProductBySearch;
