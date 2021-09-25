import { createContext, FunctionComponent, useContext, useState } from "react";
import { ProductInterface } from "../utils/format";


const uuid = require("uuid"); // Issue with importing

export interface CartInterface extends ProductInterface {
    uid: string
}

export interface CheckoutContent {
    products: CartInterface[],
    total: number,
    addToCart: (product: ProductInterface) => void
    removeFromCart: (product: CartInterface) => void
}

const defaultValue = {
    products: [],
    total: 0,
    addToCart: () => console.log('error'),
    removeFromCart: () => console.log('error'),
}

const CheckoutContext = createContext<CheckoutContent>(defaultValue);

export function useCheckout() {
    return useContext(CheckoutContext)
}

export const CheckoutProvider: FunctionComponent = ({children}) => {
    const [products, setProducts] = useState<CartInterface[]>([]);
    const [total, setTotal] = useState<number>(0);

    function addToCart(product: ProductInterface) {
        if(typeof product.price !== 'number') return;

        setProducts([
            ...products,
            {...product, uid: uuid.v4()}
        ]);
        setTotal(total + product.price)
    }

    function removeFromCart(currentProduct: CartInterface){
        if(typeof currentProduct.price !== 'number') return;

        const filteredList = products.filter((product: CartInterface) => product.uid !== currentProduct.uid)
        setProducts(filteredList);
        setTotal(total - currentProduct.price)
    }

    const value = {
        products,
        total,
        addToCart,
        removeFromCart
    }

    return (<CheckoutContext.Provider value={value}>
        {children}
    </CheckoutContext.Provider>)
}