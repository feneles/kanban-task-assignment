import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../types';
import { arrayMove } from '@dnd-kit/sortable';

interface IInitialState {
  workspaces: IBoard[];
  activeWorkspaceId: number | null;
  lastAddedWorkspaceId: number | null;
  listId: number | null;
}

const initialState: IInitialState = {
  workspaces: [],
  activeWorkspaceId: null,
  lastAddedWorkspaceId: null,
  listId: null
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewWorkspace: (state, action: PayloadAction<string>) => {
      const newWorkspace: IBoard = {
        workspaceName: action.payload,
        id: Date.now(), // Set unique id for the new workspace instead of importing new library like uuid
        content: []
      };

      state.workspaces.push(newWorkspace);
      state.lastAddedWorkspaceId = newWorkspace.id;
      state.activeWorkspaceId = newWorkspace.id;
    },
    setActiveWorkspace: (state, action: PayloadAction<number | null>) => {
      state.activeWorkspaceId = action.payload;
    },
    addNewList: (state, action: PayloadAction<string>) => {
      const activeWorkspace = state.workspaces.find(
        workspace => workspace.id === state.activeWorkspaceId
      );

      if (activeWorkspace) {
        const newList = {
          title: action.payload,
          id: Date.now(),
          cards: []
        };

        activeWorkspace.content.push(newList);
      }
    },
    updateWorkspaceName: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const { id, name } = action.payload;
      const updatedWorkspaceIndex = state.workspaces.findIndex(
        workspace => workspace.id === id
      );

      if (updatedWorkspaceIndex !== -1) {
        const updatedWorkspaces = [...state.workspaces];
        updatedWorkspaces[updatedWorkspaceIndex] = {
          ...updatedWorkspaces[updatedWorkspaceIndex],
          workspaceName: name
        };

        state.workspaces = updatedWorkspaces;
        state.lastAddedWorkspaceId = null;
      }
    },
    addNewCardToList: (
      state,
      action: PayloadAction<{ listId: number; cardName: string }>
    ) => {
      const { listId, cardName } = action.payload;
      const activeWorkspace = state.workspaces.find(
        workspace => workspace.id === state.activeWorkspaceId
      );

      if (activeWorkspace) {
        const targetList = activeWorkspace.content.find(
          list => list.id === listId
        );

        if (targetList) {
          const newCard = {
            cardName,
            id: Date.now()
          };

          targetList.cards!.push(newCard);
        }
      }
    },
    updateCardName: (
      state,
      action: PayloadAction<{ cardId: number; cardName: string }>
    ) => {
      const { cardId, cardName } = action.payload;

      const updatedWorkspaces = state.workspaces.map(workspace => {
        const updatedWorkspace = { ...workspace };
        updatedWorkspace.content = updatedWorkspace.content.map(list => {
          const updatedList = { ...list };
          updatedList.cards = (updatedList.cards || []).map(card => {
            if (card.id === cardId) {
              return { ...card, cardName };
            }
            return card;
          });
          return updatedList;
        });
        return updatedWorkspace;
      });

      state.workspaces = updatedWorkspaces;
    },
    removeCard: (state, action: PayloadAction<number>) => {
      const cardIdToRemove = action.payload;

      const updatedWorkspaces = state.workspaces.map(workspace => {
        const updatedWorkspace = { ...workspace };
        updatedWorkspace.content = updatedWorkspace.content.map(list => {
          const updatedList = { ...list };
          updatedList.cards = (updatedList.cards || []).filter(
            card => card.id !== cardIdToRemove
          );
          return updatedList;
        });
        return updatedWorkspace;
      });

      state.workspaces = updatedWorkspaces;
    },
    reorderCardInList: (
      state,
      action: PayloadAction<{
        startId: number;
        endId: number;
      }>
    ) => {
      const { startId, endId } = action.payload;
      const activeWorkspace = state.workspaces.find(
        workspace => workspace.id === state.activeWorkspaceId
      );

      if (activeWorkspace) {
        const activeList = activeWorkspace.content.find(
          list => list.cards !== undefined
        );

        if (activeList && activeList.cards) {
          const startIndex = activeList.cards.findIndex(
            card => card.id === startId
          );
          const endIndex = activeList.cards.findIndex(
            card => card.id === endId
          );
          const newCard = activeList.cards[endIndex];
          activeList.cards[endIndex] = activeList.cards[startIndex];
          activeList.cards[startIndex] = newCard;
        }
      }
    }
  }
});

export const {
  addNewWorkspace,
  setActiveWorkspace,
  addNewList,
  updateWorkspaceName,
  addNewCardToList,
  updateCardName,
  removeCard,
  reorderCardInList
} = boardSlice.actions;

export default boardSlice.reducer;
