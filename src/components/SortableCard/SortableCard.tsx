import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableCardProps } from '@components/SortableCard/SortableCard.props';
import {CSSProperties} from "react";

const SortableCard = ({id, children}: SortableCardProps) => {
    const {
        transition,
        transform,
        setNodeRef,
        attributes,
        listeners,
        isDragging,
    } = useSortable({
        id: id,
        transition: {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        touchAction: 'none',
        pointerEvents: isDragging ? 'none' : 'auto',
    };

    return (
      <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
      >
          {children}
      </div>
    );
};

export default SortableCard;