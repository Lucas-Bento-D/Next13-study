import Reviews from "./components/Reviews";
import ProductLoading from "./components/loadings/ProductLoading";
import ReviewsLoading from "./components/loadings/ReviewsLoading";
import Product from "./components/products";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<ProductLoading />}>
        <Product />
      </Suspense>
      <br />
      <Suspense fallback={<ReviewsLoading />}>
        <Reviews />
      </Suspense>
    </>
  )
}
