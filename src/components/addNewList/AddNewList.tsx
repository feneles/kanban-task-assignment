import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Create } from '../../assets/icons/create';
import './AddNewList.scss';
import { addNewList } from '../../store/slices';

export const AddNewList = () => {
  const [stage, setStage] = useState<'default' | 'inCreating'>('default');
  const [newCardTitle, setNewCardTitle] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddNewList = () => {
    if (!newCardTitle.trim()) {
      setStage('default');
      return;
    }

    dispatch(addNewList(newCardTitle));
    setNewCardTitle('');
  };

  const handleOpenInput = () => {
    setStage('inCreating');
  };

  useEffect(() => {
    if (stage === 'inCreating') {
      inputRef.current && inputRef.current.focus();
    }
  }, [stage, inputRef]);

  if (stage === 'default')
    return (
      <button
        onClick={handleOpenInput}
        className="addNewList-addCardButton bold"
      >
        <Create /> Add another list
      </button>
    );

  return (
    <div className="addNewList">
      <input
        ref={inputRef}
        className="bold noFocus"
        placeholder="Title of the new list..."
        value={newCardTitle}
        onChange={e => setNewCardTitle(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleAddNewList();
            setStage('default');
          }
        }}
      />
    </div>
  );
};
