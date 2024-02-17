import UserStore from "../../store/UserStore";
import { toast } from "react-hot-toast";

const ProfileForm = () => {
	const {
		ProfileFormData,
		ProfileFormChange,
		ProfileUpdateAPI,
		ProfileDetailsReadAPI,
	} = UserStore();

	const handleSaveChange = async () => {
		const res = await ProfileUpdateAPI(ProfileFormData);
		if (res) {
			toast.success("Profile Updated");
			await ProfileDetailsReadAPI();
		}
	};

	return (
		<>
			<div className="card p-5 rounded-3">
				<h6>Customer Details</h6>
				<hr />
				<div className="row mb-4">
					<div className="col-md-3 p-2">
						<label className="form-label">Customer Name</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_name}
							name="cus_name"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer Phone</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_phone}
							name="cus_phone"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer Fax</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_fax}
							name="cus_fax"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer Country</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_country}
							name="cus_country"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer City</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_city}
							name="cus_city"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer State</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_state}
							name="cus_state"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer Post Code</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_postcode}
							name="cus_postcode"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Customer Address</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.cus_add}
							name="cus_add"
							onChange={ProfileFormChange}
						/>
					</div>
				</div>

				<h6>Shipping Details</h6>
				<hr />
				<div className="row mb-4">
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping Name</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_name}
							name="ship_name"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping Phone</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_phone}
							name="ship_phone"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping Country</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_phone}
							name="ship_phone"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping City</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_city}
							name="ship_city"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping State</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_state}
							name="ship_state"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping Post Code</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_postcode}
							name="ship_postcode"
							onChange={ProfileFormChange}
						/>
					</div>
					<div className="col-md-3 p-2">
						<label className="form-label">Shipping Address</label>
						<input
							type="text"
							className="form-control"
							value={ProfileFormData.ship_add}
							name="ship_add"
							onChange={ProfileFormChange}
						/>
					</div>
				</div>

				<div className="row mt-4">
					<div className="col-md-3 p-2">
						<button
							className="btn btn-success"
							onClick={handleSaveChange}>
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileForm;
