import { create } from 'zustand';

interface iUiState {
  isMenuExpanded: boolean;
  setMenuExpanded: () => void;
}

const useUiState = create<iUiState>((set) => ({
  isMenuExpanded: false,
  setMenuExpanded: () => set((state) => ({ isMenuExpanded: !state.isMenuExpanded }))
}));

export default useUiState;
