import { create } from "zustand";

type Assignment = {
  assignmentName: string;
  courseId: number;
  fullMark: number;
  hurdle: number;
  id: number;
  scored: number;
  weight: number;
};

type PredictValue = {
  userName: string;
  requireScore: number;
  assignmentName: string;
  assignmentTargetScore: number;
};

interface CalculatorState {
  reset: () => void;
  selectedSemesterId: string;
  setSelectedSemesterId: (semesterId: string) => void;
  // currentValue is to store course tab value, for initial render
  currentValue: number;
  setCurrentValue: (courseName: number) => void;

  predictionValue: PredictValue;
  setPredictionValue: (values: PredictValue) => void;

  assignmentsValue: Assignment[];
  setAssignmentValue: (values: Assignment[]) => void;
}

const initialState = {
  selectedSemesterId: "",
  currentValue: 0,
  predictionValue: {} as PredictValue,
  assignmentsValue: [] as Assignment[],
};

const useStore = create<CalculatorState>((set) => ({
  ...initialState,
  reset: () => set(() => initialState),
  setSelectedSemesterId: (semesterId: string) =>
    set(() => ({ selectedSemesterId: semesterId })),
  setCurrentValue: (courseId: number) =>
    set(() => ({ currentValue: courseId })),
  setPredictionValue: (values: PredictValue) =>
    set(() => ({ predictionValue: values })),
  setAssignmentValue: (values: Assignment[]) =>
    set(() => ({ assignmentsValue: values })),
}));

export default useStore;
