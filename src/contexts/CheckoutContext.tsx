import { createContext, FunctionComponent, useContext, useState } from "react";
import { ProductInterface } from "../utils/format";


const uuid = require("uuid"); // Issue with importing

export interface CartInterface extends ProductInterface {
    uid: string
}

export interface CheckoutContent {
    products: CartInterface[],
    total: number,
    loading: boolean,
    addToCart: (product: ProductInterface) => Promise<unknown>
    removeFromCart: (product: CartInterface) => Promise<unknown>
}

const defaultValue = {
    products: [],
    total: 0,
    loading: false,
    addToCart: () => Promise.reject('Not defined'),
    removeFromCart: () => Promise.reject('Not defined'),
}

const CheckoutContext = createContext<CheckoutContent>(defaultValue);

export function useCheckout() {
    return useContext(CheckoutContext)
}

export const CheckoutProvider: FunctionComponent = ({children}) => {
    const [products, setProducts] = useState<CartInterface[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    function addToCart(product: ProductInterface) {
        if (typeof product.price !== 'number') return Promise.reject("Price not found");
        setLoading(true);

        setProducts([
            ...products,
            {...product, uid: uuid.v4()}
        ]);
        setTotal(total + product.price)

        return new Promise(resolve => setTimeout(() => {
            setLoading(false)
            return resolve(null);
        }, 2000));
    }

    function removeFromCart(currentProduct: CartInterface) {
        if (typeof currentProduct.price !== 'number') return Promise.reject("Price not found");

        setLoading(true);

        const filteredList = products.filter((product: CartInterface) => product.uid !== currentProduct.uid)
        setProducts(filteredList);
        setTotal(total - currentProduct.price)

        setLoading(false);
        return Promise.resolve();
    }

    const value = {
        products,
        total,
        loading,
        addToCart,
        removeFromCart
    }

    return (<CheckoutContext.Provider value={value}>
        {children}
    </CheckoutContext.Provider>)
}