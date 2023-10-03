import { IWorkspaceList } from '../components/workspaceList';

export interface IBoard {
  workspaceName: string;
  id: number;
  content: IWorkspaceList[];
}
