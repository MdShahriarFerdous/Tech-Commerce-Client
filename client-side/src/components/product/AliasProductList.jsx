import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductsSkeleton from "../../skeletons/ProductsSkeleton";
import ProductStore from "../../store/ProductStore";
import { useEffect, useState } from "react";

const AliasProductList = () => {
	const {
		ProductList,
		BrandList,
		BrandListAPI,
		CategoryList,
		CategoryListAPI,
		isLoading,
		FilterListError,
		ListByFilterAPI,
	} = ProductStore();

	if (FilterListError !== null) {
		console.log(FilterListError);
	}

	const [filter, setFilter] = useState({
		brandId: "",
		categoryId: "",
		priceMin: "",
		priceMax: "",
	});

	useEffect(() => {
		(async () => {
			try {
				BrandList === null ? await BrandListAPI() : null;
				CategoryList === null ? await CategoryListAPI() : null;
			} catch (error) {
				console.error(
					"Error fetching category & brand data:",
					error.message
				);
			}
		})();
	}, [BrandList, CategoryList]);

	const inputOnChange = (event) => {
		const { name, value } = event.target;
		setFilter((prevValues) => {
			return {
				...prevValues,
				[name]: value,
			};
		});
	};

	useEffect(() => {
		(async () => {
			try {
				let isFilterValuesEmpty = Object.values(filter).every(
					(value) => value === ""
				);
				!isFilterValuesEmpty ? await ListByFilterAPI(filter) : null;
			} catch (error) {
				console.error("Error fetching filter data:", error.message);
			}
		})();
	}, [filter]);

	return (
		<div className="container mt-2">
			<div className="row">
				<div className="col-md-3 p-2">
					<div className="card vh-100 p-3 shadow-sm">
						<label className="form-label mt-3">Brands</label>
						<select
							onChange={inputOnChange}
							value={filter.brandId}
							name="brandId"
							className="form-control form-select p-2">
							<option value="">Choose Brand</option>
							{BrandList &&
								BrandList.map((item, i) => (
									<option
										key={i}
										className="my-2"
										value={item._id}>
										{item.brandName}
									</option>
								))}
						</select>

						<label className="form-label mt-3">Categories</label>
						<select
							onChange={inputOnChange}
							value={filter.categoryId}
							name="categoryId"
							className="form-control form-select p-2">
							<option value="">Choose Category</option>
							{CategoryList &&
								CategoryList.map((item, i) => (
									<option
										key={i}
										className="my-2"
										value={item._id}>
										{item.categoryName}
									</option>
								))}
						</select>

						<label className="form-label mt-3">
							Maxium Price $ {filter.priceMax}
						</label>
						<input
							onChange={inputOnChange}
							min={0}
							name="priceMax"
							value={filter.priceMax}
							max={100000}
							step={100}
							type="range"
							className="form-range"
						/>
						<label className="form-label mt-3">
							Minimum Price $ {filter.priceMin}
						</label>
						<input
							onChange={inputOnChange}
							min={0}
							name="priceMin"
							value={filter.priceMin}
							max={100000}
							step={100}
							type="range"
							className="form-range"
						/>
					</div>
				</div>

				<div className="col-md-9 p-2">
					<div className="container">
						<div className="row">
							{isLoading === true || ProductList === null ? (
								<ProductsSkeleton />
							) : (
								<div className="container">
									<div className="row">
										{ProductList.map((item, i) => {
											let price = (
												<p
													key={i}
													className="bodyMedium  text-dark my-1">
													Price: ${item["price"]}{" "}
												</p>
											);
											if (item["discount"] === true) {
												price = (
													<p
														key={i}
														className="bodyMedium  text-dark my-1">
														Price:{" "}
														<strike>
															${item["price"]}
														</strike>{" "}
														${item["discountPrice"]}
													</p>
												);
											}

											return (
												<div
													key={i}
													className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
													<Link
														to={`/product-details/
																			${item._id}`}
														className="card shadow-sm h-100 rounded-3 bg-white">
														<img
															className="w-100 rounded-top-2"
															src={item["image"]}
														/>
														<div className="card-body">
															<p className="bodySmal text-secondary my-1">
																{item["title"]}
															</p>
															{price}
															<StarRatings
																rating={parseFloat(
																	item["star"]
																)}
																starRatedColor="red"
																starDimension="15px"
																starSpacing="2px"
															/>
														</div>
													</Link>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AliasProductList;
