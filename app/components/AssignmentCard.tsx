import { Button } from "@/components/ui/button";

type Assignment = {
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
};

type Props = {
  assignment: Assignment; // Update Props to include assignment
};

const AssignmentCard = ({ assignment }: Props) => {
  return (
    <div className="border-2 border-info w-[300px]">
      <p className="font-bold uppercase">{assignment.assignmentName}</p>
      <div>
        <div className="flex">
          <p>weight:</p>
          <p>{assignment.weight}</p>
        </div>
        <div className="flex">
          <p>full mark:</p>
          <p>{assignment.fullMark}</p>
        </div>
        <div className="flex">
          <p>scored:</p>
          <p>{assignment.scored}</p>
        </div>
      </div>
      <div className="flex">
        <Button variant="primary">EDIT</Button>
        <Button variant="mars">DELETE</Button>
      </div>
    </div>
  );
};

export default AssignmentCard;
