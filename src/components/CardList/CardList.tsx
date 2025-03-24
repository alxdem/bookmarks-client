import styles from '@components/CardList/CardList.module.css';
import useActiveBookmarks from '@hooks/useActiveBookmarks';
import Card from '@components/Card/Card';
import PlusIcon from '@assets/svg/plus-1.svg?react';
import { ServiceContext } from '@context/ServiceContext';
import { useContext } from 'react';

const CardList = (): JSX.Element => {
    const items = useActiveBookmarks();
    const { setModalOpen, setConfirmFormText, setCurrentEntity } = useContext(ServiceContext);

    const removeBookmark = (id: string) => {
        setConfirmFormText('Удалить закладку?');
        setCurrentEntity('bookmark');
        setModalOpen('confirm', id);
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
            image={item.image}
            onRemove={() => removeBookmark(item._id)}
        />
    ));

    const btnPlusClick = () => {
        setModalOpen('bookmark');
    };

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