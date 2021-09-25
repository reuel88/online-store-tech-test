import type { NextPage } from 'next'
import { LightningBoltIcon } from '@heroicons/react/solid'
import { useEffect, useState } from "react";
import Products from "../modules/Products"
import { ProductInterface } from "../utils/format";
import CartButton from "../modules/CartButton";


const Home: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [products, setProducts] = useState<ProductInterface[] | []>([]);

    useEffect(() => {
        setLoading(true);
        setError("");

        (async function (setLoading) {
            try {
                const response = await fetch('https://fakestoreapi.com/products?limit=5')
                const data = await response.json();

                setProducts(data)
            } catch (e: unknown) {
                if (e instanceof Error) setError(e.message);
            }

            setLoading(false);
        })(setLoading)
    }, [setLoading])

    if (error) return <div>Error occurred please try again</div>;

    return (
        <>
            <header className="flex justify-center px-5">
                <div
                    className="container flex justify-between items-center py-5 border-solid border-b border-gray-200 md:min-w">
                    <LightningBoltIcon className="h-6 text-indigo-600" />

                    <CartButton />
                </div>
            </header>

            <main className="main">
                <section className="container">
                    <h1 className="text-2xl font-bold py-5">Products</h1>

                    <Products products={products} loading={loading} />
                </section>
            </main>

            <footer className="flex justify-center px-5">
                <div
                    className="container flex justify-center gap-1 py-5 text-gray-500 border-solid border-t border-gray-200">
                    <LightningBoltIcon className="h-5 text-indigo-600" />
                    ACME Store
                </div>
            </footer>

        </>
    )
}

export default Home
