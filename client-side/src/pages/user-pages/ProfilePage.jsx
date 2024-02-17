import { Suspense, lazy, useEffect } from "react";
import UserStore from "../../store/UserStore";
const Layout = lazy(() => import("./../../components/layout/Layout"));
import ProfileSkeleton from "./../../skeletons/ProfileSkeleton";
import UserProfile from "./../../components/user/UserProfile";
import FallbackLoader from "./../../components/fallback-loader/FallbackLoader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePage = () => {
	const { ProfileDetailsReadAPI, ProfileFormDetails } = UserStore();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const msg = await ProfileDetailsReadAPI();
			if (msg === false) {
				toast.error("Please Login First");
				navigate("/login");
			}
		})();
	}, []);

	return (
		<Suspense fallback={FallbackLoader}>
			<Layout>
				{ProfileFormDetails === null ? (
					<>
						<ProfileSkeleton />
					</>
				) : (
					<>
						<UserProfile />
					</>
				)}
			</Layout>
		</Suspense>
	);
};

export default ProfilePage;
