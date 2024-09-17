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
  assignmentName: string;
  weight: number;
  targetScore: number;
  hurdle: number;
};

export const evaluateAssignments = (
  assignments: Assignment[],
  predictValue: any
) => {
  let result;
  const hasFail = assignments.some(
    (assignment) =>
      assignment.scored / assignment.fullMark < assignment.hurdle / 100
  );

  if (hasFail) {
    return (result = "fail");
  }

  // If no fail, calculate the weighted sum
  const totalWeightedScore = assignments.reduce((sum, assignment) => {
    return sum + assignment.weight * (assignment.scored / assignment.fullMark);
  }, 0);

  const requireScore =
    (predictValue.targetScore - totalWeightedScore) /
    (predictValue.weight / 100);

  if (predictValue.hurdle > requireScore) {
    return (result = predictValue.hurdle);
  } else {
    return (result = requireScore);
  }
};
