import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";

const UserLogin = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: object({
			email: string().email("Must be valid email").required(),
			password: string().min(6, "Minimum 6 characters long").required(),
		}),
		onSubmit: async (values, { resetForm }) => {
			console.log(values);
			//give a loading here
			// try {
			// 	const data = await RegisterAPI(values);
			// 	if (data.success) {
			// 		localStorage.setItem(
			// 			"basic",
			// 			JSON.stringify(data.payload.BasicUser)
			// 		);
			// 		//navigate to give OTP page
			// 	} else {
			// 		toast.success("Registration Failed!");
			// 	}
			// } catch (error) {
			// 	console.log(error.message);
			// } finally {
			//setLoading false
			// }
			// resetForm({
			// 	values: "",
			// });
		},
	});
	return (
		<div className="container section">
			<div className="row d-flex py-4 justify-content-center">
				<div className="col-md-5 p-0">
					<div className="card h-100">
						<div className="card-body p-5">
							<h2
								className="card-title mb-4 text-center"
								style={{ color: "#4d5461", fontWeight: "500" }}>
								Login
							</h2>
							<form
								className="form-group"
								onSubmit={formik.handleSubmit}>
								<label
									className="form-label my-2"
									style={{
										fontWeight: "500",
										color: "#4d5461",
									}}>
									Your Email Address
								</label>
								<input
									type="email"
									className="form-control my-2 py-3"
									placeholder="Example: alex@gmail.com"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									style={{ fontSize: "0.97rem" }}
								/>
								{formik.touched.email &&
									formik.errors.email && (
										<div className="text-danger my-1 ms-2">
											&#9432; {formik.errors.email}
										</div>
									)}

								<label
									className="form-label my-2"
									style={{
										fontWeight: "500",
										color: "#4d5461",
									}}>
									Your Password
								</label>
								<input
									type="password"
									className="form-control my-2 py-3"
									placeholder="Minimum 6 charaters"
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									style={{ fontSize: "0.97rem" }}
								/>
								{formik.touched.password &&
									formik.errors.password && (
										<span className="text-danger my-1 ms-2">
											&#9432; {formik.errors.password}
										</span>
									)}

								<button
									type="submit"
									className="btn my-3 py-3 btn-success w-100">
									Login
								</button>
							</form>
							<p className="text-center mt-2">
								Don't have Account?
								<Link className="text-info ms-2" to="/register">
									Register
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
