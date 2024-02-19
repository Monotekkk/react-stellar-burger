import {FC, ReactNode, useEffect, KeyboardEvent} from 'react';
import {createPortal} from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes, {string} from "prop-types";
import {useDispatch} from 'react-redux';

type TModal = {
    children: ReactNode,
    closePopup: () => void
}
const Modal: FC<TModal> = ({children, closePopup}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const closePopupEsc = (event: KeyboardEvent) => event.key === 'Escape' && closePopup();
        document.addEventListener('keydown', closePopupEsc);
        return () => document?.removeEventListener('keydown', closePopupEsc);
    }, [dispatch]);

    return createPortal(
        <>
            <ModalOverlay closePopup={closePopup}/>
            <div className={`${styles.modal} ${styles.opened}`}>
                <button className={styles.btn} onClick={closePopup}>
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
        </>, document.querySelector('#modals')
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closePopup: PropTypes.func.isRequired,
};

export default Modal;