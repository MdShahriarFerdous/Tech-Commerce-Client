import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/plainb-logo.svg";

const NavBar = () => {
	const [searchKeyWord, setSearchKeyword] = useState("");
	const navigate = useNavigate();

	const handleClick = () => {
		if (searchKeyWord.length > 0) {
			navigate(`/product-search/${searchKeyWord}`);
			setSearchKeyword("");
		} else {
			return;
		}
	};

	return (
		<>
			<div
				className="container-fluid text-white p-2"
				style={{ background: "#21bf73" }}>
				<div className="container">
					<div className="row justify-content-around">
						<div className="col-md-6">
							<span>
								<span className="f-12">
									<i className="bi bi-envelope mx-2 pt-2"></i>
									support-plainb@gmail.com
								</span>
								<span className="f-12 mx-2">
									<i className="bi bi-telephone-forward mx-2"></i>
									01794661657
								</span>
							</span>
						</div>

						<div className="col-md-6">
							<span className="float-end">
								<span className="bodySmal mx-2">
									<i className="bi bi-whatsapp"></i>
								</span>
								<span className="bodySmal mx-2">
									<i className="bi bi-youtube"></i>
								</span>
								<span className="bodySmal mx-2">
									<i className="bi bi-facebook"></i>
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>

			<nav className="navbar shadow-sm sticky-top bg-white navbar-expand-lg navbar-light py-3">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img
							className="img-fluid"
							src={logo}
							alt=""
							width="96px"
						/>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#nav06"
						aria-controls="nav06"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="nav06">
						<ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
							<span className="nav-item me-4">
								<Link className="nav-link" to="/">
									Home
								</Link>
							</span>

							<span className="nav-item me-4">
								<Link className="nav-link" to="/about">
									About
								</Link>
							</span>

							<span className="nav-item me-4">
								<Link className="nav-link" to="/contact">
									Contact
								</Link>
							</span>
						</ul>
					</div>
					<div className=" d-lg-flex" action="">
						<div className="input-group">
							<input
								onChange={(e) =>
									setSearchKeyword(e.target.value)
								}
								value={searchKeyWord}
								className="form-control"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button
								onClick={handleClick}
								className="btn btn-outline-dark"
								type="submit">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									style={{ width: 24, height: 24 }}>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
							</button>
						</div>
						<Link
							to="/cart"
							type="button"
							className="btn ms-3 btn-light position-relative">
							<i className="bi bi-bag"></i>
						</Link>
						<Link
							to="/wish"
							type="button"
							className="btn ms-3 btn-light pt-2 d-flex">
							<i className="bi bi-heart"></i>
						</Link>
						{(() => {
							if (localStorage.getItem("login") === "1") {
								return (
									<>
										<Link
											type="button"
											className="btn ms-3 btn-success d-flex"
											to="/profile">
											Profile
										</Link>
										<SubmitButton
											// submit={logoutLoader}
											text="Logout"
											// onClick={Logout}
											type="button"
											className="btn ms-3 btn-success d-flex"
										/>
									</>
								);
							} else {
								return (
									<Link
										type="button"
										className="btn ms-3 btn-success d-flex py-2 px-4"
										to="/login">
										Login
									</Link>
								);
							}
						})()}
					</div>
				</div>
			</nav>
		</>
	);
};

export default NavBar;
