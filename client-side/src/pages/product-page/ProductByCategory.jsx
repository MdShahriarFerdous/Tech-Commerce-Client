import React, { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import CategoriesSkeleton from "../../skeletons/CategoriesSkeleton";
import AliasProductList from "../../components/product/AliasProductList";

const ProductByCategory = () => {
	const { ListByCategoryError, ListByCategoryAPI } = ProductStore();
	const { categoryId } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await ListByCategoryAPI(categoryId);
			} catch (error) {
				console.error("Error fetching By Category id data:", error);
			}
		})();
	}, [categoryId]);

	if (ListByCategoryError !== null) {
		console.log(ListByCategoryError);
		return (
			<Layout>
				<CategoriesSkeleton />
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

export default ProductByCategory;
