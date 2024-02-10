import { lazy, Suspense } from "react";
import UserRegister from "../components/user/UserRegister";
import FallbackLoader from "../components/fallback-loader/FallbackLoader";
const Layout = lazy(() => import("../components/layout/Layout"));

const RegisterPage = () => {
	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				<UserRegister />
			</Layout>
		</Suspense>
	);
};

export default RegisterPage;
