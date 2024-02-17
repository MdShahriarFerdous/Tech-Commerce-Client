import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";
import Lottie from "lottie-react";

const ProfileImageSkeleton = () => {
	return (
		<div className="card p-3 rounded-3">
			<div className="card-body d-flex align-items-center justify-content-center">
				<Lottie
					className="w-75"
					animationData={ImagePlaceholder}
					loop={true}
				/>
			</div>
			<Skeleton count={1} className="p-3" />
		</div>
	);
};

export default ProfileImageSkeleton;
