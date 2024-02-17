import { useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";

const Layout = lazy(() => import("../../components/layout/Layout"));
import AliasProductList from "./../../components/product/AliasProductList";

import CategoriesSkeleton from "../../skeletons/CategoriesSkeleton";
import FallbackLoader from "../../components/fallback-loader/FallbackLoader";

const ProductByCategory = () => {
	const { ListByCategoryError, ListByCategoryAPI } = ProductStore();
	const { categoryId } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await ListByCategoryAPI(categoryId);
			} catch (error) {
				console.error("Error fetching By Category id data:", error);
			}
		})();
	}, [categoryId]);

	if (ListByCategoryError !== null) {
		console.log(ListByCategoryError);
	}

	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				{ListByCategoryError !== null ? (
					<>
						<CategoriesSkeleton />
					</>
				) : (
					<>
						<AliasProductList />
					</>
				)}
			</Layout>
		</Suspense>
	);
};

export default ProductByCategory;
