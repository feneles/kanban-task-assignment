import { RootState } from '../store/store';

export const saveStateToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    console.error('Error during saving state to Local Storage:', error);
  }
};

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error during reading state to Local Storage:', error);
    return undefined;
  }
};
