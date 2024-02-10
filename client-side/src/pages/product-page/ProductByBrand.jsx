import { useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";

const Layout = lazy(() => import("../../components/layout/Layout"));

import ProductsSkeleton from "./../../skeletons/ProductsSkeleton";
import FallbackLoader from "../../components/fallback-loader/FallbackLoader";
import AliasProductList from "./../../components/product/AliasProductList";

const ProductByBrand = () => {
	const { ListByBrandError, ListByBrandAPI } = ProductStore();
	const { brandId } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await ListByBrandAPI(brandId);
			} catch (error) {
				console.error("Error fetching By BrandId data:", error);
			}
		})();
	}, [brandId]);

	if (ListByBrandError !== null) {
		console.log(ListByBrandError);
	}

	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				{ListByBrandError !== null ? (
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

export default ProductByBrand;
