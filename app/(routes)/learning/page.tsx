// import { getSemesters, createSemester, updateSemester } from "@/db/queries";
import { getSemesters } from "@/app/actions/semesterAction";
import { List } from "./list";
import CreateSemester from "./create-semester";

const Learning = async () => {
  const semesters = await getSemesters();

  if (!semesters) {
    return <div>no data</div>;
  }

  return (
    <section>
      <CreateSemester />
      <List semesters={semesters} />
    </section>
  );
};

export default Learning;
