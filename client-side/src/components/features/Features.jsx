import toast from "react-hot-toast";
import FeatureStore from "../../store/FeatureStore";
import FeatureSkeleton from "../../skeletons/FeatureSkeleton";
import { useEffect } from "react";

const Features = () => {
	const { featureList, featureAPIError, featureListAPI } = FeatureStore();

	useEffect(() => {
		(async () => {
			try {
				await featureListAPI();
			} catch (error) {
				console.error("Error fetching feature data:", error);
			}
		})();
	}, []);

	if (featureAPIError !== null) {
		console.log(featureAPIError);
		// toast.error("Features data fetching failed!", {
		// 	duration: 3000,
		// });
		return <FeatureSkeleton />;
	}

	if (featureList === null) {
		return <FeatureSkeleton />;
	} else {
		return (
			<div className="container section">
				<div className="row">
					{featureList && featureList.map((item, i) => {
						return (
							<div
								key={i}
								className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
								<div className="card shadow-sm">
									<div className="card-body">
										<div className="row">
											<div className="col-3">
												<img
													alt="img"
													className="w-100"
													src={item["img"]}
												/>
											</div>
											<div className="col-9">
												<h3 className="bodyXLarge">
													{item["name"]}
												</h3>
												<span className="bodySmal">
													{item["description"]}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
};

export default Features;
