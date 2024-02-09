import React from "react";
import ProductStore from "../../store/ProductStore";
import moment from "moment";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const ProductReviews = () => {
	const { ReviewList } = ProductStore();
	return (
		<div className="list-group">
			{ReviewList &&
				ReviewList.map((item) => (
					<>
						<div
							key={item._id}
							className="list-group-item list-group-item-action p-4 "
							aria-current="true">
							<div className="d-flex w-100 justify-content-between">
								<h5 className="mb-2">
									<i className="bi bi-person"></i>
									<span className="mx-2">
										{item?.userProfile?.cus_name}
									</span>
								</h5>
								<small>
									{moment(item.createdAt).format("LLL")}
								</small>
							</div>
							<p className="mb-1" style={{ width: "90%" }}>
								{item.des}
							</p>
							<small>
								{" "}
								<StarRatings
									rating={parseFloat(item["rating"])}
									starRatedColor="red"
									starDimension="15px"
									starSpacing="2px"
								/>
							</small>
						</div>
					</>
				))}
		</div>
	);
};

export default ProductReviews;
