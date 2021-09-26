import { FunctionComponent} from "react";
import { ProductInterface} from "../utils/format";
import Product from "./Product";

interface ProductsProps {
    products: ProductInterface[],
    loading: boolean,
}

const Products: FunctionComponent<ProductsProps> = (
    {
        products,
        loading
    }
) => {

    if (loading) {
        const skeletons = new Array(6).fill("")

        return <div className="products__grid">
            {skeletons.map((skeleton, i) => <article key={i} className="product product-skeleton" />)}
        </div>
    }

    if (products.length === 0) return <>
        <h2 className="text-2xl font-bold py-5 text-gray-500 text-center">No Results Found</h2>
    </>

    return (
        <div className="products__grid">
            {products.map(
                (product, i) => (<Product key={i} product={product}/>)
            )}
        </div>
    );
}

export default Products;