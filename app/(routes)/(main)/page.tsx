"use client";

import Image from "next/image";

const Home = () => {
  return (
    <div className="bg-[#3399da] h-full w-screen">
      <div>
        <div className="absolute left-[20%] top-[30%]">
          <Image
            src="/planets/planet03.png"
            width={300}
            height={300}
            alt="drizzle GPA calculator Hero"
          />
        </div>
        <div className="absolute left-[40%] top-[30%]">
          <Image
            src="/aliens/alien02.png"
            width={50}
            height={50}
            alt="drizzle GPA calculator Hero"
          />
        </div>
        <div className="absolute left-[20%] top-[30%]">
          <Image
            src="/aliens/alien01.png"
            width={50}
            height={50}
            alt="drizzle GPA calculator Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
