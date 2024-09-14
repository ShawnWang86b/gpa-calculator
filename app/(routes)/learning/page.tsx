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
      <div className="flex flex-col justify-center items-center flex-grow min-h-[calc(100vh-80px)]">
        <Image src="/no_content.png" width={60} height={60} alt="no content" />
        <p className=" text-black font-semibold mt-2">
          No semester card founded!
        </p>
        <p className="text-sm text-muted-foreground font-semibold my-4">
          You can create a new card by clicking the button
        </p>
        <CreateSemester />
      </div>
    );
  }

  return (
    <GridBackground>
      <section className="flex-grow min-h-[calc(100vh-80px)] w-screen flex justify-center px-0 md:px-24 lg:px-48">
        {/* Horizontal Layout for md and above */}
        <div className="hidden xl:flex w-full bg-muted">
          <ResizablePanelGroup direction="horizontal" className="bg-muted">
            <ResizablePanel minSize={30} defaultSize={38}>
              <div className="border-b-[1px] p-2 flex ">
                <CreateSemester />
              </div>
              <div className="h-full p-2 mr-2">
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
        </div>

        {/* Vertical Layout for screens below md */}
        <div className="flex xl:hidden w-full bg-muted flex-col">
          <ResizablePanelGroup direction="vertical" className="bg-muted">
            <ResizablePanel minSize={30} defaultSize={38}>
              <div className="border-b-[1px] p-2 flex">
                <CreateSemester />
              </div>
              <div className="h-full p-2 mr-2">
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
        </div>
      </section>
    </GridBackground>
  );
};

export default Learning;
