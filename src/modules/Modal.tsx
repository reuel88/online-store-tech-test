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

    if (!display) return null;

    return createPortal(<div>
        <div>
            {children}
        </div>
    </div>, document.body);
}

Modal.displayName = "Modal";

export default forwardRef(Modal);