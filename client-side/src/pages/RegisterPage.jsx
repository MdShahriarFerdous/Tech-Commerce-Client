import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAPI } from "../backend-services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		onSubmit: async (values, { resetForm }) => {
			//give a loading here
			try {
				const data = await RegisterAPI(values);
				if (data.success) {
					localStorage.setItem(
						"basic",
						JSON.stringify(data.payload.BasicUser)
					);
					//navigate to give OTP page
				} else {
					toast.success("Registration Failed!");
				}
			} catch (error) {
				console.log(error.message);
			} finally {
				//setLoading false
			}
			resetForm({
				values: "",
			});
		},
	});
	return (
		<div className="container mt-5">
			<form className="form-group " onSubmit={formik.handleSubmit}>
				<div className="row d-flex py-4 justify-content-center">
					<div className="col-lg-6">
						<div className="card p-5">
							<h1 className="card-title mb-4 text-center">
								Register
							</h1>
							<input
								type="text"
								className="form-control my-2 py-3"
								placeholder="Username"
								name="username"
								value={formik.values.username}
								onChange={formik.handleChange}
							/>
							<input
								type="email"
								className="form-control my-2 py-3"
								placeholder="Email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
							<input
								type="password"
								className="form-control my-2 py-3"
								placeholder="Password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
							/>
							<button
								type="submit"
								className="btn bg-gradient-primary my-2">
								Register
							</button>
							<p className="text-center mt-2">
								Already have an account?
								<Link className="text-info ms-2" to="/login">
									Login
								</Link>
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;
