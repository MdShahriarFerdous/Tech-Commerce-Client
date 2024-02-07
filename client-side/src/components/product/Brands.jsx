import ProductStore from "../../store/ProductStore";
import toast from "react-hot-toast";
import BrandsSkeleton from "../../skeletons/BrandsSkeleton";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Brands = () => {
	const { BrandList, BrandAPIError, BrandListAPI } = ProductStore();

	useEffect(() => {
		(async () => {
			try {
				await BrandListAPI();
			} catch (error) {
				console.error("Error fetching brand data:", error);
			}
		})();
	}, []);

	if (BrandAPIError !== null) {
		console.log(BrandAPIError);
		// toast.error("Brand data fetching failed!", {
		// 	duration: 3000,
		// });
		return <BrandsSkeleton />;
	}

	if (BrandList === null) {
		return <BrandsSkeleton />;
	} else {
		return (
			<div className="section">
				<div className="container">
					<div className="row">
						<h1 className="headline-4 text-center my-2 p-0">
							Top Brands
						</h1>
						<span className="bodySmal mb-5 text-center">
							Explore a World of Choices Across Our Most Popular{" "}
							<br />
							Shopping Categories
						</span>
						{BrandList.map((item, i) => {
							return (
								<div
									key={i}
									className="col-6 col-lg-8r text-center col-md-8r p-2">
									<Link
										to={`/product-brand/${item._id}`}
										className="card h-100 rounded-3 bg-white">
										<div className="card-body">
											<img
												className="w-75"
												src={item["brandImg"]}
											/>
											<p className="bodySmal mt-3">
												{item["brandName"]}
											</p>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
};

export default Brands;
