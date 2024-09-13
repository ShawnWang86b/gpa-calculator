import { getSemesters } from "@/app/actions/semesterAction";
import { List } from "./list";
import CreateSemester from "./create-semester";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { GridBackground } from "@/components/ui/gridBackground";
import CourseSection from "@/app/components/CourseSection";

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
    <GridBackground>
      <section className=" h-[91vh] w-screen flex justify-center px-96">
        <ResizablePanelGroup direction="horizontal" className="bg-muted">
          <ResizablePanel minSize={35}>
            <div className="border-b-[1px] p-2 flex ">
              <CreateSemester />
            </div>
            <div className=" h-full p-2 mr-2">
              <List semesters={semesters} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={35}>
            <div className="border-b-[1px] p-2">
              <CourseSection />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
    </GridBackground>
  );
};

export default Learning;
