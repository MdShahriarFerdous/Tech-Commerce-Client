import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import Cookies from "js-cookie";
import { getBasicUserData } from "../../utility/utility";
import UserStore from "../../store/UserStore";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const VerifyCode = () => {
	const [isCountFinish, setIsCountFinish] = useState(false);
	const [resendTryCount, setResendTryCount] = useState(4);
	const [TryAgainClick, setTryAgainClick] = useState(false);
	const [canResend, setCanResend] = useState(true);
	const [resendEmail, setResendEmail] = useState("");
	const [OTPCode, setOTPCode] = useState("");
	const navigate = useNavigate();
	const [auth, setAuth] = useAuth();
	const {
		ResendOTPAPI,
		AlterMailResendAPI,
		UserVerifyAPI,
		Loading,
		verifyError,
	} = UserStore();

	//*===========================Local-Storage-Data===========================
	const BasicUser = getBasicUserData();
	//*===========================CountDown-Logics==============================
	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			setIsCountFinish(true);
			resendTryCount > 0
				? setResendTryCount(resendTryCount - 1)
				: localStorage.removeItem("basic-user") &&
				  setCanResend(false) &&
				  navigate("/register");

			canResend
				? Cookies.set("countCookie", resendTryCount, {
						expires: 1 / 144,
				  })
				: null;
			toast("Oops! Time Finished, Try Again!");
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
		} else if (!countFromCookie && BasicUser) {
			return;
		} else {
			navigate("/register");
		}
	}, []);

	//*======================When click on resend button=======================
	const resendClick = (e) => {
		e.preventDefault();
		setTryAgainClick(false);
		if (resendTryCount > 0 && BasicUser) {
			setResendTryCount(resendTryCount - 1);

			resendTryCount > 0
				? Cookies.set("countCookie", resendTryCount, {
						expires: 1 / 144,
				  }) && setIsCountFinish(false)
				: null;

			//api call
			BasicUser.email === resendEmail
				? ResendOTPAPI(BasicUser)
				: AlterMailResendAPI(resendEmail);

			setResendEmail("");
			toast.success("An OTP has sent to your email", { duration: 3000 });
		} else {
			toast.warning("Please Do Register Again");
			localStorage.removeItem("basic-user");
			setCanResend(false);
			navigate("/register");
		}
	};

	//*======================Try again TEXT click for OTP=======================
	const tryAgainClick = (e) => {
		e.preventDefault();
		setTryAgainClick(true);
	};

	//*======================Verification-Click=======================
	const verificationClick = async (e) => {
		e.preventDefault();

		if (OTPCode === "") {
			toast.warning("OTP Code is Required to Verify!");
		}

		let OTP = Number(OTPCode);
		const message = await UserVerifyAPI(OTP);

		if (message) {
			setAuth({
				...auth,
				isLoggedIn: true,
			});
			toast.success("Succesfully Registered!");
			Cookies.remove("countCookie");
			navigate("/");
			setOTPCode("");
		}

		if (verifyError) {
			console.log(verifyError);
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
								Verify your account using the OTP code. We
								typically send the code to the email address you
								provided.
							</p>
							{isCountFinish === false ? (
								<p
									className="mb-2 mt-2"
									style={{ fontSize: "1rem" }}>
									OTP will be invalid in{" "}
									<strong style={{ color: "red" }}>
										{/* 120000 */}
										<Countdown
											date={Date.now() + 60000}
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
										value={OTPCode}
										onChange={(e) =>
											setOTPCode(e.target.value)
										}
									/>
									<button
										text="Verify"
										onClick={verificationClick}
										className="btn my-3 btn-success w-100 py-2"
										disabled={Loading}>
										{Loading ? (
											<>
												<div className="spinner-border spinner-border-sm mx-2"></div>
												Processing...
											</>
										) : (
											"Verify"
										)}
									</button>
								</form>
							) : (
								<p className="mt-2">
									<>
										<span>
											Missed or Did not get an OTP?
										</span>
										<span
											style={{ cursor: "pointer" }}
											className="text-info ms-2"
											onClick={tryAgainClick}>
											Try Again
										</span>
									</>
								</p>
							)}

							{TryAgainClick === true ? (
								<>
									<form>
										<label className="form-label mt-3 mb-1">
											Enter Your Mail to get OTP Again
										</label>

										<input
											type="text"
											className="form-control py-2"
											placeholder="Email Here..."
											value={resendEmail}
											onChange={(e) =>
												setResendEmail(e.target.value)
											}
										/>
										<button
											onClick={resendClick}
											className="btn my-3 btn-success w-100 py-2"
											disabled={Loading}>
											{Loading ? (
												<>
													<div className="spinner-border spinner-border-sm mx-2"></div>
													Sending...
												</>
											) : (
												<>
													Resend OTP (
													{resendTryCount === 4
														? resendTryCount - 1
														: resendTryCount}
													)
												</>
											)}
										</button>
									</form>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyCode;
