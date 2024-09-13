import { create } from "zustand";

interface CalculatorState {
  reset: () => void;
  selectedSemesterId: string;
  setSelectedSemesterId: (semesterId: string) => void;
  // currentValue is to store course tab value, for initial render
  currentValue: number;
  setCurrentValue: (courseName: number) => void;
}

const initialState = {
  selectedSemesterId: "",
  currentValue: 0,
};

const useStore = create<CalculatorState>((set) => ({
  ...initialState,
  reset: () => set(() => initialState),
  setSelectedSemesterId: (semesterId: string) =>
    set(() => ({ selectedSemesterId: semesterId })),
  setCurrentValue: (courseId: number) =>
    set(() => ({ currentValue: courseId })),
}));

export default useStore;
