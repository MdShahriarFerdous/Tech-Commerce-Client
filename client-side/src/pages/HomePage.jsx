import { Suspense, lazy } from "react";
const Layout = lazy(() => import("./../components/layout/Layout"));
import Brands from "../components/product/Brands";
import Slider from "../components/product/Slider";
import Categories from "../components/product/Categories";
import ProductLists from "../components/product/ProductLists";
import Features from "../components/features/Features";
import FallbackLoader from "../components/fallback-loader/FallbackLoader";

const HomePage = () => {
	return (
		<>
			<Suspense fallback={<FallbackLoader />}>
				<Layout>
					<Slider />
					<Features />
					<Categories />
					<ProductLists />
					<Brands />
				</Layout>
			</Suspense>
		</>
	);
};

export default HomePage;
