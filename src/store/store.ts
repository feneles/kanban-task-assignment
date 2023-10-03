import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices';
import {
  saveStateToLocalStorage,
  loadStateFromLocalStorage
} from '../localStorage';

const getPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState !== null) {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error('Error during reading state from Local Storage:', error);
  }
  return undefined;
};

const persistedState = getPersistedState() || loadStateFromLocalStorage();

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
