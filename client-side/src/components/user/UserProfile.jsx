import React from "react";
import ProfileForm from "./ProfileForm";
import ProfileImage from "./ProfileImage";
import { useAuth } from "../../context/authContext";
import UserStore from "../../store/UserStore";

const UserProfile = () => {
	const [auth] = useAuth();
	const { ProfileFormDetails } = UserStore();
	return (
		<div className="container mt-5">
			<div className="mb-4">
				<div className="row">
					<div className="col-12 col-md-4 col-lg-4 rounded-3">
						<ProfileImage />
					</div>
					<div className="col-12 col-md-8 col-lg-8">
						<div className="card rounded-3 pb-3 px-4 py-3">
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">Username</h6>
								<h6>{auth && auth.user?.username}</h6>
							</div>
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">Email</h6>
								<h6>{auth && auth.user?.email}</h6>
							</div>
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">Phone</h6>
								<h6>
									{ProfileFormDetails &&
										ProfileFormDetails?.cus_phone}
								</h6>
							</div>
							<div className="d-flex align-items-center mb-3 w-75 justify-content-between">
								<h6 className="mx-3">City</h6>
								<h6>
									{ProfileFormDetails &&
										ProfileFormDetails?.cus_city}
								</h6>
							</div>
							<div className="d-flex align-items-center w-75 justify-content-between">
								<h6 className="mx-3">Address</h6>
								<h6>
									{ProfileFormDetails &&
										ProfileFormDetails?.cus_add}
								</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ProfileForm />
		</div>
	);
};

export default UserProfile;
