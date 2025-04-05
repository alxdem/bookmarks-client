import Modal from 'react-modal';
import { useContext } from 'react';
import { ServiceContext } from '@context/ServiceContext';
import XIcon from '@assets/svg/x.svg?react';
import styles from '@layouts/Modals/Modals.module.css';
import FormCategory from '@/components/FormCategory/FormCategory';
import { isCategoryType, isBookmarkType } from '@t/commonTypes';
import FormConfirm from '@components/FormConfirm/FormConfirm';
import useDeleteCategory from '@hooks/useDeleteCategory';
import FormBookmark from '@components/FormBookmark/FormBookmark';
import useDeleteBookmark from '@hooks/useDeleteBookmark';
import { lSCategoryClear, lSBookmarkClear } from '@utils/methods';

Modal.setAppElement('#root');

const Modals = () => {
    const {
        isModalOpen = false,
        confirmFormText,
        currentEntity,
        modalType,
        itemId,
        setModalClose,
        setModalOpen,
        setConfirmFormText,
        setCurrentEntity,
    } = useContext(ServiceContext) || {};
    const [deleteCategory, isCategoryLoading] = useDeleteCategory();
    const [deleteBookmark, isBookmarkLoading] = useDeleteBookmark();

    const close = () => {
        setModalClose();
    };

    const confirmCategoryRemoving = (id: string) => {
        setConfirmFormText('Удалить категорию?');
        setCurrentEntity('category');
        setModalOpen('confirm', id);
    }

    const removeCategory = async () => {
        const res = await deleteCategory(itemId);

        if (!res?._id) {
            return;
        }

        lSCategoryClear();
        setModalClose();
    }

    const removeBookmark = async () => {
        const res = await deleteBookmark(itemId);

        if (!res?._id) {
            return;
        }

        lSBookmarkClear();
        setModalClose();
    };

    const confirm = () => {
        switch (currentEntity) {
            case 'category':
                removeCategory();
                break;
            case 'bookmark':
                removeBookmark();
                break;
            default:
        }
    }

    return (
        <Modal
            isOpen={isModalOpen}
            className={styles.inner}
            overlayClassName={styles.overlay}
            onRequestClose={close}
        >
            {isCategoryType(modalType)
                && <FormCategory
                    type={modalType}
                    id={itemId}
                    remove={confirmCategoryRemoving}
                />
            }
            {isBookmarkType(modalType)
                && <FormBookmark
                    type={modalType}
                    id={itemId}
                />
            }
            {modalType === 'confirm'
                && <FormConfirm
                    text={confirmFormText}
                    isLoading={isCategoryLoading || isBookmarkLoading}
                    reject={close}
                    confirm={confirm}
                />}

            <button className={styles.close} onClick={close}>
                <XIcon />
            </button>
        </Modal>
    );
};

export default Modals;