import { getSemesters } from "@/app/actions/semesterAction";
import { List } from "./list";
import CreateSemester from "./create-semester";
import Image from "next/image";

const Learning = async () => {
  const semesters = await getSemesters();

  if (semesters.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src="/no_content.png" width={60} height={60} alt="no content" />
        <p className=" text-black font-semibold mt-2">
          No semester card founded!
        </p>
        <p className="text-sm text-muted-foreground font-semibold mt-2">
          You can create a new card by clicking the button
        </p>
        <CreateSemester />
      </div>
    );
  }

  return (
    <section>
      <CreateSemester />
      <List semesters={semesters} />
    </section>
  );
};

export default Learning;
