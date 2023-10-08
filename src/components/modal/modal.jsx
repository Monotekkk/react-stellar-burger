import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { CLEAR_VIEWE_INGRIDIENTS } from '../../service/actions';
const Modal = ({ children, closePopup }) => {
    const dispatch = useDispatch();
    useEffect(() => {

        const closePopupEsc = event => {
            if (event.key === 'Escape') {
                closePopup();
                dispatch({ type: CLEAR_VIEWE_INGRIDIENTS });
            }
        };

        document.addEventListener('keydown', closePopupEsc);

        return () => document.removeEventListener('keydown', closePopupEsc);
    }, [closePopup]);

    return createPortal(
        <>
            <ModalOverlay closePopup={closePopup} />
            <div className={`${styles.modal} ${styles.opened}`}>
                <button className={styles.btn} onClick={closePopup}>
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </>, document.body
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closePopup: PropTypes.func.isRequired,
};

export default Modal;