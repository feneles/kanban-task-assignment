import { useState } from 'react';
import './ControlWorkspaceButton.scss';
import { Create } from '../../assets/icons/create';
import { Save } from '../../assets/icons/save';
import { useDispatch, useSelector } from 'react-redux';
import { addNewWorkspace, updateWorkspaceName } from '../../store/slices';
import { getLastAddedWorkspaceId } from '../../store/selectors';

interface IControlWorkspace {
  isWorkspaceNameFilled: boolean;
  workspaceNewName: string;
}

export const ControlWorkspace = ({
  isWorkspaceNameFilled,
  workspaceNewName
}: IControlWorkspace) => {
  const [workspaceButtonState, setWorkspaceButtonState] = useState<
    'default' | 'save'
  >('default');

  const dispatch = useDispatch();
  const lastAddedWorkspaceId = useSelector(getLastAddedWorkspaceId);

  const handleButtonClick = () => {
    if (workspaceButtonState === 'default') {
      dispatch(addNewWorkspace(''));
      setWorkspaceButtonState('save');
    } else {
      dispatch(
        updateWorkspaceName({
          id: lastAddedWorkspaceId!,
          name: workspaceNewName
        })
      );
      setWorkspaceButtonState('default');
    }
  };

  const displayButtonContent = () => {
    if (workspaceButtonState === 'default')
      return (
        <>
          <Create /> Create workspace
        </>
      );
    return (
      <>
        <Save /> Save new workspace
      </>
    );
  };

  return (
    <button
      className={`controlWorkspaceButton controlWorkspaceButton-${workspaceButtonState} bold`}
      onClick={handleButtonClick}
      disabled={!isWorkspaceNameFilled && workspaceButtonState !== 'default'}
    >
      {displayButtonContent()}
    </button>
  );
};
