import { FunctionComponent, SyntheticEvent, useState } from "react";
import { useCheckout } from "../contexts/CheckoutContext";
import { formatAsCurrency, formatAsRating, ProductInterface } from "../utils/format";


interface ProductProps {
    product: ProductInterface,
}

const Product: FunctionComponent<ProductProps> = ({product}) => {
    const {addToCart} = useCheckout();
    const [btnLoading, setBtnLoading] = useState(false);

    function handleClick(e: SyntheticEvent, product: ProductInterface) {
        setBtnLoading(true);
        addToCart(product).then(() => {
            setBtnLoading(false);
        })
    }

    return (<article className="product">
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
            disabled={btnLoading}
            onClick={e => handleClick(e, product)}
        >
            Add to cart
        </button>
    </article>)
}

export default Product;