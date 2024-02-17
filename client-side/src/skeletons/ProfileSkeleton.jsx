import Skeleton from "react-loading-skeleton";
import ProfileImageSkeleton from "./ProfileImageSkeleton";

const ProfileSkeleton = () => {
	return (
		<div className="container mt-5">
			<div className="mb-4">
				<div className="row">
					<div className="col-12 col-md-4 col-lg-4 rounded-3">
						<ProfileImageSkeleton />
					</div>
					<div className="col-12 col-md-8 col-lg-8">
						<div className="card rounded-3 pb-3 px-4 py-3">
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">Username</h6>
								<Skeleton
									count={1}
									width="350px"
									className="p-3"
								/>
							</div>
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">Email</h6>
								<Skeleton
									count={1}
									width="350px"
									className="p-3"
								/>
							</div>
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">Phone</h6>
								<Skeleton
									count={1}
									width="350px"
									className="p-3"
								/>
							</div>
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">City</h6>
								<Skeleton
									count={1}
									width="350px"
									className="p-3"
								/>
							</div>
							<div className="d-flex align-items-center w-75 justify-content-between">
								<h6 className="mx-3">Address</h6>
								<Skeleton
									count={1}
									width="350px"
									className="p-3"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="card p-5 rounded-3">
				<h6>Customer Details</h6>
				<hr />
				<div className="row mb-4">
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
				</div>

				<h6>Shipping Details</h6>
				<hr />
				<div className="row mb-4">
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
				</div>

				<div className="row mt-4">
					<div className="col-md-3 p-2">
						<Skeleton count={2} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
