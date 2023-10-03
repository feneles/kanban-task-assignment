import { RootState } from '../store/store';

export const selectActiveWorkspace = (state: RootState) => {
  const { activeWorkspaceId, workspaces } = state.board;
  return workspaces.find(workspace => workspace.id === activeWorkspaceId);
};

export const allWorkspaces = (state: RootState) => state.board.workspaces;

export const getLastAddedWorkspaceId = (state: RootState) =>
  state.board.lastAddedWorkspaceId;

export const getActiveWorkspaceId = (state: RootState) =>
  state.board.activeWorkspaceId;
