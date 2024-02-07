import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";
import Lottie from "lottie-react";

const FeatureSkeleton = () => {
	return (
		<div className="section bg-light">
			<div className="container">
				<div className="row">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
							<div className="card shadow-sm">
								<div className="card-body">
									<div className="row">
										<div className="col-4">
											<Lottie
												className="w-100"
												animationData={ImagePlaceholder}
												loop={true}
											/>
										</div>
										<div className="col-8">
											<Skeleton count={3} />
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FeatureSkeleton;
