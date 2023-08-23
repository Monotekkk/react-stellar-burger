import {useEffect} from 'react';
import {createPortal} from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const Modal = ({children, closePopup}) => {

    useEffect(() => {

        const closePopupEsc = event => {
            if(event.key === 'Escape') {
                closePopup()
            }
        };

        document.addEventListener('keydown', closePopupEsc);

        return () => document.removeEventListener('keydown', closePopupEsc);
    }, [closePopup]);

    return createPortal(
        <>
            <ModalOverlay closePopup={closePopup}/>
            <div className={`${styles.modal} ${styles.opened}`}>
                <button className={styles.btn} onClick={closePopup}>
                    <CloseIcon type="primary"/>
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