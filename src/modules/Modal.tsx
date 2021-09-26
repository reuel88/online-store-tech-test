import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useState, ReactNode, useImperativeHandle, ForwardRefRenderFunction } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode
}

interface ModalHandle {
    handleOpen: () => void,
    handleClose: () => void,
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
}

const Modal: ForwardRefRenderFunction<ModalHandle, ModalProps> = ({children}, ref) => {
    const [display, setDisplay] = useState(false);

    const onOpen = () => {
        setDisplay(true);
    };

    const onClose = () => {
        setDisplay(false);
    };

    useImperativeHandle(ref, () => {
        return {
            handleOpen: () => onOpen(),
            handleClose: () => onClose()
        };
    });

    // if (!display || !document?.body) return null;
    if (typeof document === "undefined"  || !document?.body) return null;

    return createPortal(<>
        <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null} >
            {display && <motion.div
                className="fixed flex justify-center top-0 bottom-0 left-0 right-0 p-4 md:p-16 z-50 backdrop-filter backdrop-blur-lg overflow-scroll"
                onClick={onClose}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <motion.div
                    role="dialog"
                    aria-modal={true}
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={e => e.stopPropagation()}>
                    {children}
                </motion.div>
            </motion.div>}

        </AnimatePresence>
    </>, document.body);
}

Modal.displayName = "Modal";

export default forwardRef(Modal);