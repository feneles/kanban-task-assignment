import { useEffect, useRef, useState } from 'react';
import './WorkspaceList.scss';
import { Create } from '../../assets/icons/create';
import { Card, ICard } from '../card';
import { addNewCardToList, reorderCardInList } from '../../store/slices';
import { useDispatch } from 'react-redux';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

export interface IWorkspaceList {
  title: string;
  id: number;
  cards?: ICard[];
}

export const WorkspaceList = ({ title, id, cards }: IWorkspaceList) => {
  const [isInputDisplayed, setIsInputDisplayed] = useState<boolean>(false);
  const [isHoveringControlledButtons, setIsHoveringControlledButtons] =
    useState<boolean>(false);
  const [newCardName, setNewCardName] = useState<string>('');
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleShowInput = () => setIsInputDisplayed(true);

  const handleAddNewCard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (newCardName.trim() !== '' && e.key === 'Enter') {
      dispatch(addNewCardToList({ listId: id, cardName: newCardName }));
      setNewCardName('');
      setIsInputDisplayed(false);
    }
  };

  const handleOnBlur = () => {
    setNewCardName('');
    setIsInputDisplayed(false);
  };

  useEffect(() => {
    if (isInputDisplayed) {
      inputRef.current && inputRef.current.focus();
    }
  }, [isInputDisplayed]);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id && over?.id) {
      const startId = active.id as number;
      const endId = over.id as number;
      dispatch(reorderCardInList({ startId, endId }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="list">
        <p className="list-title bold">{title}</p>
        {cards && (
          <ul className="list-cardContainer">
            <SortableContext
              items={cards}
              strategy={verticalListSortingStrategy}
              disabled={isHoveringControlledButtons}
            >
              {cards &&
                cards.map(card => (
                  <Card
                    key={card.id}
                    {...card}
                    setIsHoveringControlledButtons={
                      setIsHoveringControlledButtons
                    }
                  />
                ))}
            </SortableContext>
          </ul>
        )}
        {isInputDisplayed && (
          <input
            ref={inputRef}
            type="text"
            className="list-input"
            placeholder="Title of the new card..."
            value={newCardName}
            onChange={e => setNewCardName(e.target.value)}
            onKeyDown={handleAddNewCard}
            onBlur={handleOnBlur}
          />
        )}
        <button className="list-addCardButton bold" onClick={handleShowInput}>
          <Create /> Add a card
        </button>
      </div>
    </DndContext>
  );
};
