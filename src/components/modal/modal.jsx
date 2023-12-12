import  { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { CLEAR_VIEW_INGREDIENT } from '../../service/actions';
import {useSearchParams} from "react-router-dom";
const Modal = ({ children, closePopup }) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    setSearchParams({children});
    console.log(searchParams);
    useEffect(() => {
        const closePopupEsc = event => {
            if (event.key === 'Escape') {
                closePopup();
                dispatch({ type: CLEAR_VIEW_INGREDIENT });
            }
        };

        document.addEventListener('keydown', closePopupEsc);

        return () => document.removeEventListener('keydown', closePopupEsc);
    }, [dispatch, closePopup]);

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