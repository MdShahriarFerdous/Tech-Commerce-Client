import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import Cookies from "js-cookie";

const VerifyCode = () => {
	const [isCountFinish, setIsCountFinish] = useState(false);
	const [resendTryCount, setResendTryCount] = useState(4);
	const [canResend, setCanResend] = useState(true);
	const navigate = useNavigate();

	//*===========================Local-Storage-Data===========================
	let localStorageUserData;
	const data = localStorage.getItem("basicUser");
	data ? (localStorageUserData = JSON.parse(data)) : null;

	//*===========================CountDown-Logics==============================
	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			setIsCountFinish(true);
			resendTryCount > 0
				? setResendTryCount(resendTryCount - 1)
				: localStorage.removeItem("basicUser") &&
				  setCanResend(false) &&
				  navigate("/register");

			canResend
				? Cookies.set("countCookie", resendTryCount, {
						expires: 1 / 44,
				  })
				: null;
			return "";
		} else {
			return (
				<span>
					0{minutes}:{seconds}
				</span>
			);
		}
	};

	//*=======When page refresh manually or direct come to verify link==========
	useEffect(() => {
		const countFromCookie = Cookies.get("countCookie");
		if (resendTryCount === 4 && countFromCookie) {
			const countValue = parseInt(countFromCookie);
			setResendTryCount(countValue);
		} else {
			navigate("/register");
		}
	}, []);

	//*======================When click on resend button=======================
	const resendClick = (e) => {
		e.preventDefault();
		if (resendTryCount > 0 && localStorageUserData) {
			setResendTryCount(resendTryCount - 1);

			resendTryCount > 0
				? Cookies.set("countCookie", resendTryCount, {
						expires: 1 / 44,
				  }) && setIsCountFinish(false)
				: null;

			//api call
		} else {
			localStorage.removeItem("basicUser");
			setCanResend(false);
			navigate("/register");
			//toast
		}
	};

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
								address you provided.
							</p>
							{isCountFinish === false ? (
								<p
									className="mb-2 mt-2"
									style={{ fontSize: "1rem" }}>
									OTP will be invalid in{" "}
									<strong style={{ color: "red" }}>
										<Countdown
											date={Date.now() + 120000}
											renderer={renderer}
										/>
									</strong>
								</p>
							) : null}

							{isCountFinish === false ? (
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
							) : (
								<button
									// submit={BtnLoader}
									onClick={resendClick}
									className="btn my-3 btn-success w-100 py-2">
									Resend OTP (
									{resendTryCount === 4
										? resendTryCount - 1
										: resendTryCount}
									)
								</button>
							)}
							{/* <p className="text-center mt-2">
								Did not get OTP?
								<Link className="text-info ms-2" to="/resend">
									Resend OTP
								</Link>
							</p> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyCode;
