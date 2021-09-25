import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CheckoutProvider } from "../contexts/CheckoutContext";

function MyApp({Component, pageProps}: AppProps) {
    return (<CheckoutProvider>
        <Component {...pageProps} />
    </CheckoutProvider>);
}

export default MyApp
