import { FunctionComponent } from "react";
import { ProductInterface, formatAsCurrency, formatAsRating } from "../utils/format";
import { useCheckout } from "../contexts/CheckoutContext";

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
    const {addToCart} = useCheckout();

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
            {products.map((product, i) => {
                return (
                    <article className="product" key={i}>
                        <div
                            className="flex justify-center items-center p-5 border border-gray-200 rounded-xl col-span-2 overflow-hidden">
                            <img src={product.image} alt={product.title} className="h-80" />
                        </div>
                        <h2 className="title text-gray-500 font-medium col-span-2">{product.title}</h2>
                        <p className="font-medium text-lg">{formatAsCurrency(product.price)}</p>
                        <div className="text-right">{formatAsRating(product.rating)}</div>
                        <button
                            type="button"
                            className="btn col-span-2"
                            onClick={() => addToCart(product)}
                        >
                            Add to cart
                        </button>
                    </article>
                );
            })}
        </div>
    );
}

export default Products;