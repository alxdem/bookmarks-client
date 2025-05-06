import styles from '@components/CardList/CardList.module.css';
import useActiveBookmarks from '@hooks/useActiveBookmarks';
import Card from '@components/Card/Card';
import PlusIcon from '@assets/svg/plus-1.svg?react';
import { ServiceContext } from '@context/ServiceContext';
import {useContext, useRef} from 'react';
import { message } from '@utils/variables';
import {DndContext, DragEndEvent, useSensor, MouseSensor, useSensors} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SortableCard from '@components/SortableCard/SortableCard';
import useOrderBookmarks from '@hooks/useOrderBookmarks';
import cn from 'classnames';

const CardList = (): JSX.Element => {
    const dragStarted = useRef(false);
    const [items, setItems] = useActiveBookmarks();
    const [reorder, isReorderLoading] = useOrderBookmarks();
    const { setModalOpen, setConfirmFormText, setCurrentEntity } = useContext(ServiceContext);
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
            // delay: 1000,
            // tolerance: 800,
        }
    });
    const sensors = useSensors(mouseSensor);

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

    const onDragStart = () => {
        dragStarted.current = true;
    };

    const onDragEnd = async ({active, over}: DragEndEvent) => {
        dragStarted.current = false;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex(item => item._id === active.id);
        const newIndex = items.findIndex(item => item._id === over.id);
        const newOrderItems = arrayMove(items, oldIndex, newIndex);

        setItems(newOrderItems);
        await reorder(newOrderItems);
        dragStarted.current = false;
    };

    const innerClasses = cn(
        styles.inner,
        {[styles.loading]: isReorderLoading}
    );

    const elements = items.map(item => (
        <SortableCard id={item._id} key={item._id}>
            <Card
                userId={item.userId}
                title={item.title}
                url={item.url}
                description={item.description}
                categoryId={item.categoryId}
                order={item.order}
                onRemove={() => removeBookmark(item._id)}
                onEdit={() => editBookmark(item._id)}
            />
        </SortableCard>
    ));

    return (
        <section className={styles.cardList}>
            <div className={innerClasses}>
                <DndContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    sensors={sensors}
                >
                    <SortableContext items={items.map(item => item._id)}>
                        {elements}
                    </SortableContext>
                </DndContext>
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