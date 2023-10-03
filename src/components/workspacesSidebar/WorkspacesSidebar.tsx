import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';
import { Workspace } from '../workspace';
import { WorkspaceNavigation } from '../workspaceNavigation';
import { ControlWorkspace } from '../controlWorkspaceButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';

export const WorkspacesSidebar = () => {
  const [isWorkspaceNameFilled, setIsWorkspaceNameFilled] = useState(false);
  const [workspaceNewName, setWorkspaceNewName] = useState<string>('');
  const workspaces = useSelector((state: RootState) => state.board.workspaces);
  return (
    <div className="workspaces">
      <div className="workspaces-header">
        {workspaces.map(item => (
          <Workspace
            key={item.id}
            {...item}
            setIsWorkspaceNameFilled={setIsWorkspaceNameFilled}
            onNameChange={setWorkspaceNewName}
          />
        ))}
        <ControlWorkspace
          isWorkspaceNameFilled={isWorkspaceNameFilled}
          workspaceNewName={workspaceNewName}
        />
      </div>
      <div className="workspaces-main">
        <WorkspaceNavigation />
      </div>
      <div className="workspaces-footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
