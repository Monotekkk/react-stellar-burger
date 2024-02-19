import styles from './modal-overlay.module.css'
import {FC} from "react";

type TOverlay = {
    closePopup: ()=>void
}
const ModalOverlay:FC<TOverlay> = ({closePopup}) => {
    return (
        <div className={`${styles.overlay} ${styles.opened}`} onClick={closePopup}></div>
    );
};

export default ModalOverlay;