import { ElementRef, FunctionComponent, useRef } from "react";
import { ShoppingBagIcon, XCircleIcon } from "@heroicons/react/outline";
import { CartInterface, useCheckout } from "../contexts/CheckoutContext";
import Modal from "./Modal";
import { formatAsCurrency } from "../utils/format";

type ModalHandle = ElementRef<typeof Modal>;

const CartButton:FunctionComponent = () => {
    const modalRef = useRef<ModalHandle>(null);
    const {products, removeFromCart, total} = useCheckout();

    function openModal() {
        modalRef?.current?.handleOpen();
    }

    function closeModal() {
        modalRef?.current?.handleClose();
    }

    return <>
        <button className="flex items-center gap-1 text-gray-400 hover:text-indigo-600 focus:outline-indigo"
                onClick={() => openModal()}>
            <ShoppingBagIcon className="h-6 " />
            <span className="text-gray-500">x{products.length}</span>
        </button>

        <Modal ref={modalRef}>
            <section className="bg-white border border-gray-200 p-4 rounded-xl max-w-md w-full">
                <header className="grid grid-cols-2">
                    <h2 className="text-lg font-medium">Shopping Cart</h2>
                    <div className="text-right">
                        <button className="text-gray-500 focus:outline-indigo" onClick={closeModal}>
                            <span className="sr-only">Close</span>
                            <XCircleIcon className="h-6" />
                        </button>
                    </div>
                </header>

                <div className="col-span-2">
                    {products.map((product: CartInterface) => {
                        return (
                            <article
                                className="grid grid-cols-cartItem grid-rows-2 gap-4 py-6 border-b border-gray-200"
                                key={product.uid}>
                                <div
                                    className="flex justify-center items-center p-2 border border-gray-200 rounded-xl row-span-2">
                                    <img src={product.image} alt={product.title} className="h-20" />
                                </div>
                                <h2 className="title text-gray-500 font-medium col-span-2">{product.title}</h2>
                                <p className="font-medium text-lg">{formatAsCurrency(product.price)}</p>
                                <div className="text-right">
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer"
                                        onClick={() => removeFromCart(product)}
                                    >Remove
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <footer className="text-center pt-4 flex flex-col gap-4">
                    <strong className="text-lg font-medium">Order Total: {formatAsCurrency(total)} </strong>
                    <button className="btn" onClick={() => console.log('hello')}>
                        Checkout
                    </button>
                </footer>
            </section>
        </Modal>
    </>;
}

export default CartButton;