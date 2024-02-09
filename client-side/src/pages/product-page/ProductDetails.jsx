import { useParams } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import ProductStore from "../../store/ProductStore";
import FallbackLoader from "../../components/fallback-loader/FallbackLoader";
import DetailedProduct from "../../components/product/DetailedProduct";
import DetailsSkeleton from "../../skeletons/DetailsSkeleton";
import Brands from "../../components/product/Brands";
import BrandsSkeleton from "../../skeletons/BrandsSkeleton";
const Layout = lazy(() => import("../../components/layout/Layout"));

const ProductDetails = () => {
	const {
		ProductDetailsError,
		ProductDetailsAPI,
		BrandListAPI,
		BrandList,
		ReviewListError,
		ReviewListAPI,
		isLoading,
	} = ProductStore();

	const { productId } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await ProductDetailsAPI(productId);
				await ReviewListAPI(productId);
				BrandList === null ? await BrandListAPI() : null;
			} catch (error) {
				console.error(
					"Error fetching in product Details page:",
					error.message
				);
			}
		})();
	}, [productId]);

	if (ReviewListError || ProductDetailsError) {
		console.log("Erros in Product Details page", ProductDetailsError);
		console.log("Erros in Product Details page", ReviewListError);
	}

	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				{ReviewListError || ProductDetailsError || isLoading ? (
					<>
						<div>
							<DetailsSkeleton />
							<BrandsSkeleton />
						</div>
					</>
				) : (
					<>
						<DetailedProduct />
						<Brands />
					</>
				)}
			</Layout>
		</Suspense>
	);
};

export default ProductDetails;
