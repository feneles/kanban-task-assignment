import { useEffect, useRef, useState } from 'react';
import './Card.scss';
import { useDispatch } from 'react-redux';
import { removeCard, updateCardName } from '../../store/slices';
import { Edit } from '../../assets/icons/edit';
import { Remove } from '../../assets/icons/remove';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface ICard {
  cardName: string;
  id: number;
  setIsHoveringControlledButtons: (value: boolean) => void;
}

export const Card = ({
  cardName,
  id,
  setIsHoveringControlledButtons
}: ICard) => {
  const [cardStage, setCardStage] = useState<'default' | 'inEditing'>(
    'default'
  );
  const [showControllers, setShowControllers] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        type: 'Card'
      }
    });

  const ref = useRef<HTMLParagraphElement | null>(null);
  const dispatch = useDispatch();

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  useEffect(() => {
    if (cardStage === 'inEditing' && ref.current) {
      ref.current.contentEditable = 'true';
      ref.current.focus();

      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [cardStage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter' && cardStage === 'inEditing') {
      e.preventDefault();
      const newName = ref.current?.innerText;
      if (newName !== undefined && newName !== cardName) {
        dispatch(updateCardName({ cardName: newName, cardId: id }));
      }
      setCardStage('default');
    }
  };

  const handleRemoveCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeCard(id));
  };

  return (
    <li
      className="card"
      onMouseEnter={() => setShowControllers(true)}
      onMouseLeave={() => setShowControllers(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p
        ref={ref}
        contentEditable={cardStage == 'inEditing'}
        className={cardStage === 'inEditing' ? 'card-inEditing' : ''}
        onKeyDown={handleKeyDown}
      >
        {cardName}
      </p>
      {showControllers && (
        <div className="card-controllersContainer">
          <button
            className="card-controller"
            onClick={() => setCardStage('inEditing')}
            onMouseEnter={() => setIsHoveringControlledButtons(true)}
            onMouseLeave={() => setIsHoveringControlledButtons(false)}
          >
            <Edit />
          </button>
          <button
            className="card-controller"
            onClick={handleRemoveCard}
            onMouseEnter={() => setIsHoveringControlledButtons(true)}
            onMouseLeave={() => setIsHoveringControlledButtons(false)}
          >
            <Remove />
          </button>
        </div>
      )}
    </li>
  );
};
