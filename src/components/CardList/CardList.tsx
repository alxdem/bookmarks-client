import styles from '@components/CardList/CardList.module.css';
import useActiveBookmarks from '@hooks/useActiveBookmarks';
import Card from '@components/Card/Card';
import PlusIcon from '@assets/svg/plus-1.svg?react';
import { ServiceContext } from '@context/ServiceContext';
import { useContext } from 'react';
import { message } from '@utils/variables';

const CardList = (): JSX.Element => {
    const items = useActiveBookmarks();
    const { setModalOpen, setConfirmFormText, setCurrentEntity } = useContext(ServiceContext);

    const removeBookmark = (id: string) => {
        setConfirmFormText(message.BOOKMARK_REMOVE_QUESTION);
        setCurrentEntity('bookmark');
        setModalOpen('confirm', id);
    };

    const editBookmark = (id: string) => {
        setModalOpen('bookmarkUpdate', id);
    };

    const btnPlusClick = () => {
        setModalOpen('bookmarkCreate');
    };

    const elements = items.map(item => (
        <Card
            key={item._id}
            userId={item.userId}
            title={item.title}
            url={item.url}
            description={item.description}
            categoryId={item.categoryId}
            order={item.order}
            onRemove={() => removeBookmark(item._id)}
            onEdit={() => editBookmark(item._id)}
        />
    ));

    return (
        <section className={styles.cardList}>
            <div className={styles.inner}>
                {elements}
                <button
                    className={styles.button}
                    type='button'
                    onClick={btnPlusClick}
                >
                    <PlusIcon />
                </button>
            </div>
        </section>
    );
};

export default CardList;