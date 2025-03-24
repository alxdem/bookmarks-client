import Modal from 'react-modal';
import { useContext } from 'react';
import { ServiceContext } from '@context/ServiceContext';
import XIcon from '@assets/svg/x.svg?react';
import styles from '@layouts/Modals/Modals.module.css';
import FormCategory from '@/components/FormCategory/FormCategory';
import { isCategoryType } from '@t/commonTypes';
import FormConfirm from '@components/FormConfirm/FormConfirm';
import useDeleteCategory from '@hooks/useDeleteCategory';
import FormBookmark from '@components/FormBookmark/FormBookmark';

Modal.setAppElement('#root');

const Modals = () => {
    const {
        isModalOpen = false,
        confirmFormText,
        ModalType,
        itemId,
        setModalClose,
        setModalOpen,
        setConfirmFormText,
    } = useContext(ServiceContext) || {};
    const [deleteCategory, isLoading] = useDeleteCategory();

    const close = () => {
        setModalClose();
    };

    const confirmRemoving = (id: string) => {
        setConfirmFormText('Удалить категорию?');
        setModalOpen('confirm', id);
    }

    const removeCategory = async () => {
        const res = await deleteCategory(itemId);

        if (!res?._id) {
            return;
        }

        setModalClose();
    }

    return (
        <Modal
            isOpen={isModalOpen}
            className={styles.inner}
            overlayClassName={styles.overlay}
            onRequestClose={close}
        >
            {isCategoryType(ModalType)
                && <FormCategory
                    type={ModalType}
                    id={itemId}
                    remove={confirmRemoving}
                />
            }
            {ModalType === 'bookmark' && <FormBookmark />}
            {ModalType === 'confirm'
                && <FormConfirm
                    text={confirmFormText}
                    isLoading={isLoading}
                    reject={close}
                    confirm={removeCategory}
                />}

            <button className={styles.close} onClick={close}>
                <XIcon />
            </button>
        </Modal>
    );
};

export default Modals;