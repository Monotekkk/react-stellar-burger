import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({closePopup}) => {
    return (
        <div className={`${styles.overlay} ${styles.opened}`} onClick={closePopup}></div>
    );
};

ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;