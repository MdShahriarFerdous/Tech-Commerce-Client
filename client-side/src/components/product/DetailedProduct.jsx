import React, { useState } from "react";
import ProductImages from "./ProductImages";
import ProductStore from "../../store/ProductStore";
import parse from "html-react-parser";
import ProductReviews from "./ProductReviews";

const DetailedProduct = () => {
	const { ProductDetails } = ProductStore();
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = (e) => {
		e.preventDefault();
		setQuantity((qty) => qty + 1);
	};

	const decrementQuantity = (e) => {
		e.preventDefault();
		if (quantity > 1) {
			setQuantity((qty) => qty - 1);
		}
	};

	return (
		<div>
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-7 p-3">
						<ProductImages />
					</div>

					<div className="col-md-5 p-3">
						<h4>
							{ProductDetails[0]
								? ProductDetails[0]["title"]
								: "Product-Details"}
						</h4>
						<p className="text-muted bodySmal my-1">
							Category:{" "}
							{ProductDetails[0]
								? ProductDetails[0]["category"]["categoryName"]
								: ""}
						</p>
						<p className="text-muted bodySmal mb-2 mt-1">
							Brand:{" "}
							{ProductDetails[0]
								? ProductDetails[0]["brand"]["brandName"]
								: ""}
						</p>
						<p className="bodySmal mb-2 mt-1">
							{ProductDetails[0]
								? ProductDetails[0]["shortDes"]
								: ""}
						</p>

						<h4>
							{(() => {
								if (ProductDetails[0]) {
									if (
										ProductDetails[0]["discount"] === true
									) {
										return (
											<span>
												<strike className="text-secondary">
													$
													{ProductDetails[0]["price"]}
												</strike>{" "}
												$
												{
													ProductDetails[0][
														"discountPrice"
													]
												}
											</span>
										);
									} else {
										return (
											<span>
												${ProductDetails[0]["price"]}
											</span>
										);
									}
								}
							})()}
						</h4>

						<div className="row">
							<div className="col-4 p-2">
								<label className="bodySmal">Size</label>
								<select
									// value={cartData["size"]}
									name=""
									// onChange={(e) => {
									// 	inputOnChange("size", e.target.value);
									// }}
									className="form-control my-2 form-select">
									<option value="">Choose Size</option>
									{ProductDetails[0]?.productDetails?.size
										.split(",")
										.map((item, i) => {
											return (
												<option key={i} value={item}>
													{item}
												</option>
											);
										})}
								</select>
							</div>
							<div className="col-4 p-2">
								<label className="bodySmal">Color</label>
								<select
									// value={cartData["color"]}
									name=""
									// onChange={(e) => {
									// 	inputOnChange("color", e.target.value);
									// }}
									className="form-control my-2 form-select">
									<option value="">Choose Color</option>
									{ProductDetails[0]?.productDetails?.color
										.split(",")
										.map((item, i) => {
											return (
												<option key={i} value={item}>
													{item}
												</option>
											);
										})}
								</select>
							</div>

							<div className="col-4 p-2">
								<label className="bodySmal">Quantity</label>
								<div className="input-group my-2">
									<button
										onClick={decrementQuantity}
										className="btn btn-outline-secondary">
										-
									</button>
									<input
										type="text"
										value={quantity}
										className="form-control text-center"
										readOnly
									/>
									<button
										onClick={incrementQuantity}
										className="btn btn-outline-secondary">
										+
									</button>
								</div>
							</div>

							<div className="col-4  p-2">
								<button
									// onClick={AddCart}
									className="btn w-100 btn-success"
									text="Add to Cart"
									// submit={cartBtnLoader}
								>
									Add to Cart
								</button>
							</div>
							<div className="col-4  p-2">
								<button
									// onClick={AddWish}
									className="btn w-100 btn-success"
									text="Add to Wish"
									// submit={wishBtnLoader}
								>
									Add to Wish
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					<ul className="nav nav-tabs" id="myTab" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className="nav-link active"
								id="Speci-tab"
								data-bs-toggle="tab"
								data-bs-target="#Speci-tab-pane"
								type="button"
								role="tab"
								aria-controls="Speci-tab-pane"
								aria-selected="true">
								Specifications
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className="nav-link"
								id="Review-tab"
								data-bs-toggle="tab"
								data-bs-target="#Review-tab-pane"
								type="button"
								role="tab"
								aria-controls="Review-tab-pane"
								aria-selected="false">
								Review
							</button>
						</li>
					</ul>
					<div className="tab-content p-3" id="myTabContent">
						<div
							className="tab-pane fade show active mt-2"
							id="Speci-tab-pane"
							role="tabpanel"
							aria-labelledby="Speci-tab"
							tabIndex="0">
							{parse(ProductDetails[0].productDetails?.des)}
						</div>

						<div
							className="tab-pane fade"
							id="Review-tab-pane"
							role="tabpanel"
							aria-labelledby="Review-tab"
							tabIndex="0">
							<ProductReviews />
						</div>
					</div>
				</div>
			</div>

			{/* {data[0] ? (
				<SmilierProduct categoryID={data[0]["categoryID"]} />
			) : (
				""
			)} */}
		</div>
	);
};

export default DetailedProduct;
