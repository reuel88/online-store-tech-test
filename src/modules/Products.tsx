import { FunctionComponent } from "react";
import { StarIcon as SoldStarIcon } from '@heroicons/react/solid'

interface Rating {
    rate: number,
    count: number
}

export interface ProductInterface {
    image: string,
    title: string,
    price: number | string,
    rating: null | Rating
}

type formatAsCurrencyFn = (init: number | string) => string;
type formatAsRatingFn = (rating: null | Rating) => any;


const formatAsCurrency: formatAsCurrencyFn = (int) => {
    // NOT typeof number
    if (typeof int !== "number") return int;

    return new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'}).format(int);
};

const formatAsRating: formatAsRatingFn = (rating) => {
    if (!rating) return null;

    const ratingRounded = Math.round(rating.rate ?? 0);
    const ratingArray = new Array(5).fill("");

    return <div className="flex">
        {ratingArray.map((v, i) => <SoldStarIcon key={i}
                                                 className={`h-6 ${(i < ratingRounded) ? `text-yellow-500` : `text-gray-300`}`} />)}
        <span className="text-gray-500">({rating.count ?? 0})</span>
    </div>
}

const Products: FunctionComponent<{ products: ProductInterface[], loading: boolean }> = ({products, loading}) => {

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
            {products.map(product => {
                return (
                    <article className="product">
                        <div
                            className="flex justify-center items-center p-5 border border-gray-200 rounded-xl col-span-2">
                            <img src={product.image} alt={product.title} className="h-80" />
                        </div>
                        <h2 className="title text-gray-500 font-medium col-span-2">{product.title}</h2>
                        <p className="font-medium text-lg">{formatAsCurrency(product.price)}</p>
                        <div className="text-right">{formatAsRating(product.rating)}</div>
                        <button
                            type="button"
                            className="btn">
                            Add to cart
                        </button>
                    </article>
                );
            })}
        </div>
    );
}

export default Products;