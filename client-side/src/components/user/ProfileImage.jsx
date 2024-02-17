import { useState } from "react";
import { useAuth } from "../../context/authContext";
import UserStore from "../../store/UserStore";
import toast from "react-hot-toast";
import ImagePlaceholder from "../../assets/images/ImagePlaceholder.svg";
import Lottie from "lottie-react";

const ProfileImage = () => {
	const [auth] = useAuth();
	const [userImage, setUserImage, ImageLoader] = useState("");
	const { UserImageUpdateAPI } = UserStore();

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setUserImage(imageUrl);
			try {
				const imageData = new FormData();
				imageData.append("profileImage", file);
				const UpdatedImage = await UserImageUpdateAPI(imageData);
				if (UpdatedImage) {
					toast.success("Profile Image Updated!");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="card p-3 rounded-3">
			<div className="d-flex align-items-center justify-content-center">
				<div
					style={{
						width: "120px",
						height: "120px",
						borderRadius: "60px",
						border: "1px solid #FAF8F6",
					}}>
					{ImageLoader ? (
						<Lottie
							className="w-75"
							animationData={ImagePlaceholder}
							loop={true}
						/>
					) : (
						<img
							style={{
								width: "120px",
								height: "120px",
								borderRadius: "60px",
							}}
							src={userImage ? userImage : auth?.image}
							alt="profile-image"
						/>
					)}
				</div>
			</div>
			<form
				className="form-group my-2 px-3"
				encType="multipart/form-data">
				<label className="btn my-3 btn-success w-100 py-1">
					Update Photo
					<input
						type="file"
						className="form-control"
						accept="image/*"
						onChange={handleImageChange}
						hidden
					/>
				</label>
			</form>
		</div>
	);
};

export default ProfileImage;
