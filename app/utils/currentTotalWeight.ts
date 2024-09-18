type Assignment = {
  assignmentName: string;
  courseId: number;
  fullMark: number;
  hurdle: number;
  id: number;
  scored: number;
  weight: number;
};

export const getCurrentTotalWeight = (existingAssignments: Assignment[]) => {
  const currentTotalWeight = existingAssignments.reduce(
    (sum: number, assignment: Assignment) => sum + assignment.weight,
    0
  );

  return currentTotalWeight;
};
