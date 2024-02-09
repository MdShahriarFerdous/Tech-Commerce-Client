import ProductStore from "../../store/ProductStore";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductImages = () => {
	const { ProductDetails } = ProductStore();
	let images = [
		{
			original: ProductDetails[0].productDetails?.img1,
			thumbnail: ProductDetails[0].productDetails?.img1,
		},
		{
			original: ProductDetails[0].productDetails?.img2,
			thumbnail: ProductDetails[0].productDetails?.img2,
		},
		{
			original: ProductDetails[0].productDetails?.img3,
			thumbnail: ProductDetails[0].productDetails?.img3,
		},
		{
			original: ProductDetails[0].productDetails?.img4,
			thumbnail: ProductDetails[0].productDetails?.img4,
		},
		{
			original: ProductDetails[0].productDetails?.img5,
			thumbnail: ProductDetails[0].productDetails?.img5,
		},
		{
			original: ProductDetails[0].productDetails?.img6,
			thumbnail: ProductDetails[0].productDetails?.img6,
		},
		{
			original: ProductDetails[0].productDetails?.img7,
			thumbnail: ProductDetails[0].productDetails?.img7,
		},
		{
			original: ProductDetails[0].productDetails?.img8,
			thumbnail: ProductDetails[0].productDetails?.img8,
		},
	];
	return (
		<div>
			<ImageGallery autoPlay={true} items={images} />
		</div>
	);
};

export default ProductImages;
