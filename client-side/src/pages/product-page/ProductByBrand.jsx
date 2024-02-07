import React, { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "./../../components/layout/Layout";
import AliasProductList from "../../components/product/AliasProductList";
import ProductsSkeleton from "./../../skeletons/ProductsSkeleton";

const ProductByBrand = () => {
	const { ListByBrandError, ListByBrandAPI } = ProductStore();
	const { brandId } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await ListByBrandAPI(brandId);
			} catch (error) {
				console.error("Error fetching By BrandId data:", error);
			}
		})();
	}, [brandId]);

	if (ListByBrandError !== null) {
		console.log(ListByBrandError);
		return (
			<Layout>
				<ProductsSkeleton />
			</Layout>
		);
	} else {
		return (
			<Layout>
				<AliasProductList />
			</Layout>
		);
	}
};

export default ProductByBrand;
