import { StarIcon as SoldStarIcon } from "@heroicons/react/solid";

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


export const formatAsCurrency: formatAsCurrencyFn = (int) => {
    // NOT typeof number
    if (typeof int !== "number") return int;

    return new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'}).format(int);
};

export const formatAsRating: formatAsRatingFn = (rating) => {
    if (!rating) return null;

    const ratingRounded = Math.round(rating.rate ?? 0);
    const ratingArray = new Array(5).fill("");

    return <div className="flex">
        {ratingArray.map((v, i) => <SoldStarIcon key={i}
                                                 className={`h-6 ${(i < ratingRounded) ? `text-yellow-500` : `text-gray-300`}`} />)}
        <span className="text-gray-500">({rating.count ?? 0})</span>
    </div>
}