import toast from "react-hot-toast";
import SliderSkeleton from "../../skeletons/SliderSkeleton";
import ProductStore from "../../store/ProductStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Slider = () => {
	const { SliderListAPI, SliderList, SliderAPIError } = ProductStore();

	useEffect(() => {
		(async () => {
			try {
				await SliderListAPI();
			} catch (error) {
				console.error("Error fetching slider data:", error);
			}
		})();
	}, []);

	if (SliderAPIError !== null) {
		console.log(SliderAPIError);
		// toast.error("Slider data fetching failed!", {
		// 	duration: 3000,
		// });
		return <SliderSkeleton />;
	}

	if (SliderList === null) {
		return <SliderSkeleton />;
	} else {
		return (
			<div
				id="carouselExampleDark"
				className="carousel hero-bg carousel-dark slide">
				<div className="carousel-indicators">
					{SliderList &&
						SliderList.map((_, i) => {
							return (
								<button
									key={i}
									type="button"
									data-bs-target="#carouselExampleDark"
									data-bs-slide-to={i}
									className="active"
									aria-current="true"
									aria-label={"Slide " + i}></button>
							);
						})}
				</div>
				<div className="carousel-inner py-5">
					{SliderList.map((item, i) => {
						let active = "carousel-item";
						if (i === 0) {
							active = "carousel-item active";
						}
						return (
							<div
								key={i}
								className={active}
								data-bs-interval="10000">
								<div className="container">
									<div className="row justify-content-center">
										<div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
											<h1 className="headline-1">
												{item["title"]}
											</h1>
											<p>{item["des"]}</p>
											<Link
												to={`/slider-details/${item.productId}`}
												className="btn text-white btn-success px-5 py-2">
												Buy Now
											</Link>
										</div>
										<div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
											<img
												src={item.img}
												className="w-100"
												alt="slider-img"
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<button
					className="carousel-control-prev btn rounded-5"
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide="prev">
					<span
						className="carousel-control-prev-icon"
						aria-hidden="true"></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next btn"
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide="next">
					<span
						className="carousel-control-next-icon"
						aria-hidden="true"></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		);
	}
};

export default Slider;
