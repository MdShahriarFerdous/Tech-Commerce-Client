import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";
import Lottie from "lottie-react";

const ProfileImageSkeleton = () => {
	return (
		<div className="card p-3">
			<div className="card-body text-center">
				<Lottie
					className="w-100"
					animationData={ImagePlaceholder}
					loop={true}
				/>
				<Skeleton count={1} />
				<Skeleton count={1} />
				<Skeleton count={1} />
			</div>
		</div>
	);
};

export default ProfileImageSkeleton;
