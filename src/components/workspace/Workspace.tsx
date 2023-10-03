import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './Workspace.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveWorkspace } from '../../store/slices';
import {
  selectActiveWorkspace,
  getLastAddedWorkspaceId
} from '../../store/selectors';

interface IWorkspace {
  workspaceName: string;
  id: number;
  setIsWorkspaceNameFilled: (value: boolean) => void;
  onNameChange: (value: string) => void;
}

export const Workspace = ({
  workspaceName,
  id,
  setIsWorkspaceNameFilled,
  onNameChange
}: IWorkspace) => {
  const dispatch = useDispatch();
  const activeWorkspaceId = useSelector(selectActiveWorkspace)?.id;
  const lastAddedWorkspaceId = useSelector(getLastAddedWorkspaceId);
  const isEditable = activeWorkspaceId === lastAddedWorkspaceId;

  const [isActive, setIsActive] = useState<boolean>(id === activeWorkspaceId);
  const [name, setName] = useState<string>(workspaceName);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleActiveWorkspace = () => {
    dispatch(setActiveWorkspace(id));
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setName(newValue);
    onNameChange(newValue);
    setIsWorkspaceNameFilled(!!newValue);
  };

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  useEffect(() => {
    setIsActive(id === activeWorkspaceId);
  }, [activeWorkspaceId, id]);

  return (
    <div
      className={`workspace-container ${isActive ? 'workspace-active' : ''}`}
      onClick={handleActiveWorkspace}
    >
      <div className="workspace-titleContainer">
        <div className="workspace-icon">
          <p>{workspaceName.slice(0, 1).toUpperCase()}</p>
        </div>
        <input
          ref={inputRef}
          disabled={!isEditable}
          className="workspace-input bold noFocus"
          placeholder="Workspace name"
          value={name}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};
