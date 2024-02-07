import fallbackLoader from "../../assets/images/rolling-loader.svg";

const FallbackLoader = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100vh" }}>
			<img
				src={fallbackLoader}
				alt="Loading"
				style={{ width: "100px" }}
			/>
		</div>
	);
};

export default FallbackLoader;
