import { create } from "zustand";

interface CalculatorState {
  reset: () => void;
  selectedSemesterId: string;
  setSelectedSemesterId: (semesterId: string) => void;
  // currentValue is to store course tab value, for initial render
  currentValue: number;
  setCurrentValue: (courseName: number) => void;

  predictionValue: any;
  setPredictionValue: (values: any) => void;

  assignmentsValue: any;
  setAssignmentValue: (values: any) => void;
}

const initialState = {
  selectedSemesterId: "",
  currentValue: 0,
  predictionValue: {},
  assignmentsValue: [],
};

const useStore = create<CalculatorState>((set) => ({
  ...initialState,
  reset: () => set(() => initialState),
  setSelectedSemesterId: (semesterId: string) =>
    set(() => ({ selectedSemesterId: semesterId })),
  setCurrentValue: (courseId: number) =>
    set(() => ({ currentValue: courseId })),
  setPredictionValue: (values: any) => set(() => ({ predictionValue: values })),
  setAssignmentValue: (values: any) =>
    set(() => ({ assignmentsValue: values })),
}));

export default useStore;
