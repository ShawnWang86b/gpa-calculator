type Assignment = {
  assignmentName: string;
  courseId: number;
  fullMark: number;
  hurdle: number;
  id: number;
  scored: number;
  weight: number;
};

export const getFinalAssignmentWeight = (assignments: Assignment[]) => {
  const totalWeightedScore = assignments.reduce((sum, assignment) => {
    return sum + assignment.weight;
  }, 0);

  const finalAssignmentWeight = 100 - totalWeightedScore;
  return finalAssignmentWeight > 0 ? finalAssignmentWeight : 0;
};
