import React, { Suspense, lazy } from "react";
import VerifyCode from "../components/user/VerifyCode";
import FallbackLoader from "../components/fallback-loader/FallbackLoader";
const Layout = lazy(() => import("../components/layout/Layout"));

const VerifyPage = () => {
	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				<VerifyCode />
			</Layout>
		</Suspense>
	);
};

export default VerifyPage;
