import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { AddNewList } from './components/addNewList';
import { WorkspaceList } from './components/workspaceList';
import { WorkspacesSidebar } from './components/workspacesSidebar';
import {
  allWorkspaces,
  getActiveWorkspaceId,
  selectActiveWorkspace
} from './store/selectors';
import { useEffect } from 'react';
import { setActiveWorkspace } from './store/slices';

export const App = () => {
  const activeWorkspace = useSelector(selectActiveWorkspace);
  const activeWorkspaceId = useSelector(getActiveWorkspaceId);
  const workspaces = useSelector(allWorkspaces);
  const dispatch = useDispatch();

  const workspacesCount = workspaces.length;

  useEffect(() => {
    if (workspacesCount > 0 && !activeWorkspaceId) {
      dispatch(setActiveWorkspace(1));
    }
  }, [workspacesCount, activeWorkspaceId, dispatch]);

  return (
    <div className="container">
      <WorkspacesSidebar />
      {activeWorkspace?.content.map(list => (
        <WorkspaceList key={list.id} {...list} />
      ))}
      {activeWorkspace?.workspaceName && <AddNewList />}
    </div>
  );
};
