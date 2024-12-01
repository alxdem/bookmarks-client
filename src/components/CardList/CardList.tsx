import styles from './CardList.module.css';
import useActiveBookmarks from '../../hooks/useActiveBookmarks';
import Card from '../Card/Card';

const CardList = (): JSX.Element => {
    const items = useActiveBookmarks();

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
        />
    ))

    return (
        <section className={styles.cardList}>
            <div className={styles.inner}>
                {elements}
            </div>
        </section>
    );
};

export default CardList;