import { lazy, Suspense } from "react";
import UserLogin from "./../components/user/UserLogin";
import FallbackLoader from "../components/fallback-loader/FallbackLoader";
const Layout = lazy(() => import("../components/layout/Layout"));

const LoginPage = () => {
	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				<UserLogin />
			</Layout>
		</Suspense>
	);
};

export default LoginPage;
