import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";
import Lottie from "lottie-react";

const DetailsSkeleton = () => {
	return (
		<>
			<div className="section bg-light">
				<div className="container mt-2">
					<div className="row bg-white">
						<div className="col-md-7 p-2 col-lg-6 col-sm-12 col-12">
							<div className="card h-100 rounded-3">
								<div className="w-75 m-auto">
									<Lottie
										animationData={ImagePlaceholder}
										loop={true}
									/>
								</div>

								<div className="card-body">
									<div className="row g-2 p-2">
										<div className="col-3 card shadow-sm">
											<Lottie
												className="w-100"
												animationData={ImagePlaceholder}
												loop={true}
											/>
										</div>
										<div className="col-3 card shadow-sm">
											<Lottie
												className="w-100"
												animationData={ImagePlaceholder}
												loop={true}
											/>
										</div>
										<div className="col-3 card shadow-sm">
											<Lottie
												className="w-100"
												animationData={ImagePlaceholder}
												loop={true}
											/>
										</div>
										<div className="col-3 card shadow-sm">
											<Lottie
												className="w-100"
												animationData={ImagePlaceholder}
												loop={true}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-5 p-2 col-lg-6 col-sm-12 col-12 ">
							<div className="card p-2 h-100 rounded-3">
								<div className="card-body">
									<h4
										style={{ width: "90%" }}
										className="mt-4">
										<Skeleton height={32} />
									</h4>
									<p
										className="my-3"
										style={{ width: "30%" }}>
										<Skeleton />
									</p>
									<p
										className="my-1"
										style={{ width: "15%" }}>
										<Skeleton />
									</p>
									<p
										className="my-4"
										style={{ width: "80%" }}>
										<Skeleton count={3} height={30} />
									</p>
									<h4
										className="mt-3"
										style={{
											width: "40%",
										}}>
										<Skeleton height={32} />
									</h4>

									<div className="row mt-4">
										<div className="p-2 col-6 col-sm-6 col-lg-4">
											<p
												className="mb-2"
												style={{ width: "32%" }}>
												<Skeleton />
											</p>
											<div style={{ width: "80%" }}>
												<Skeleton height={42} />
											</div>
										</div>

										<div className="p-2 col-6 col-sm-6 col-lg-4">
											<p
												className="mb-2"
												style={{ width: "32%" }}>
												<Skeleton />
											</p>
											<div style={{ width: "80%" }}>
												<Skeleton height={42} />
											</div>
										</div>

										<div className="p-2 col-6 col-sm-6 col-lg-4">
											<p
												className="mb-2"
												style={{ width: "32%" }}>
												<Skeleton />
											</p>
											<div style={{ width: "80%" }}>
												<Skeleton height={42} />
											</div>
										</div>
									</div>

									<div className="row mt-4">
										<div className="col-6 col-lg-4 ">
											<div style={{ width: "90%" }}>
												<Skeleton height={42} />
											</div>
										</div>

										<div className="col-6 col-lg-4">
											<div style={{ width: "90%" }}>
												<Skeleton height={42} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DetailsSkeleton;
