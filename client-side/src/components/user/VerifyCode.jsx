import React from "react";
import { Link } from "react-router-dom";

const VerifyCode = () => {
	return (
		<div className="container section">
			<div className="row d-flex justify-content-center">
				<div className="col-md-5">
					<div className="card p-4">
						<div className="card-body">
							<h3
								className="mb-4"
								style={{ color: "#4d5461", fontWeight: "500" }}>
								Enter Verification Code
							</h3>
							<p>
								A verification code has been sent to the email
								address you provided. OTP will be invalid after
								2 minutes.
							</p>
							<form>
								<label className="form-label my-2">
									Verification Code
								</label>
								<input
									type="text"
									className="form-control py-2"
									placeholder="Type or Paste Here..."
								/>
								<button
									text="Verify"
									// submit={BtnLoader}
									// onClick={LoginVerify}
									className="btn my-3 btn-success w-100 py-2">
									Verify
								</button>
							</form>
							<p className="text-center mt-2">
								Did not get OTP?
								<Link className="text-info ms-2" to="/resend">
									Resend OTP
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyCode;
