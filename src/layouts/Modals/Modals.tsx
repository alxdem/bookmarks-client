import Modal from 'react-modal';
import { useContext } from 'react';
import { ServiceContext } from '@context/ServiceContext';
import XIcon from '@assets/svg/x.svg?react';
import styles from '@layouts/Modals/Modals.module.css';
import FormCategoryCreate from '@components/FormCategoryCreate/FormCategoryCreate';

Modal.setAppElement('#root');

const Modals = () => {
    const { isModalOpen = false, setModalClose, modalType } = useContext(ServiceContext) || {};

    const close = () => {
        setModalClose();
    };

    return (
        <Modal
            isOpen={isModalOpen}
            className={styles.inner}
            overlayClassName={styles.overlay}
            onRequestClose={close}
        >
            {modalType === 'category' && <FormCategoryCreate />}
            {modalType === 'bookmark' && <div>ttrtewrtwet</div>}

            <button className={styles.close} onClick={close}>
                <XIcon />
            </button>
        </Modal>
    );
};

export default Modals;