import { forwardRef, useState, ReactNode, useImperativeHandle, ForwardRefRenderFunction } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode
}

interface ModalHandle {
    handleOpen: () => void,
    handleClose: () => void,
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

    if (!display || !document?.body) return null;

    return createPortal(<div
        className="fixed flex justify-center top-0 bottom-0 left-0 right-0 p-4 md:p-16 z-50 backdrop-filter backdrop-blur-lg overflow-scroll">
        <div role="dialog" aria-modal={true}>
            {children}
        </div>
    </div>, document.body);
}

Modal.displayName = "Modal";

export default forwardRef(Modal);