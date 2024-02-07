import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PageNotFound from "./pages/PageNotFound";
// import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import BannedPage from "./pages/banned-page/BannedPage";
import ProductByBrand from "./pages/product-page/ProductByBrand";
import ProductByCategory from "./pages/product-page/ProductByCategory";
import ProductBySearch from "./pages/product-page/ProductBySearch";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* <Route path="/user" element={<PrivateRoute />}>
					<Route path="secret-page" element={<SecretPage />} />
				</Route> */}
				<Route path="/banned" element={<BannedPage />} />
				<Route
					path="/product-brand/:brandId"
					element={<ProductByBrand />}
				/>
				<Route
					path="/product-category/:categoryId"
					element={<ProductByCategory />}
				/>
				<Route
					path="/product-search/:keyword"
					element={<ProductBySearch />}
				/>
				<Route path="*" element={<PageNotFound />} replace />
			</Routes>
			<Toaster position="top-right" reverseOrder={false} />
		</BrowserRouter>
	);
};

export default App;
