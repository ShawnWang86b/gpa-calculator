"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 "
      >
        {/* Hero Image group */}
        <div className="flex flex-col xl:flex-row justify-center items-center gap-40 flex-grow min-h-[calc(100vh-80px)]">
          <div>
            <Image src="/hero.png" alt="hero image" width={600} height={600} />
          </div>
          <div>
            <div className="flex flex-col justify-center items-start">
              <div className="text-xl md:text-2xl font-bold text-center ">
                <p>Score Calculator for Success</p>
              </div>
              <div className="text-sm pt-2 pb-4 leading-none">
                Simplifying Grade Calculations for Better Academic Planning
              </div>

              <div>
                <ClerkLoading>
                  <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                </ClerkLoading>
                <ClerkLoaded>
                  <SignedOut>
                    <SignUpButton mode="modal">
                      <Button variant="primary" className="w-full uppercase">
                        Get Started
                      </Button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <Button
                        variant="secondaryOutline"
                        className="w-full mt-2 bg-transparent uppercase"
                      >
                        I Already Have an Account
                      </Button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <Button
                      variant="primary"
                      className=" mt-2 uppercase"
                      asChild
                    >
                      <Link href="/learning">Dashboard</Link>
                    </Button>
                  </SignedIn>
                </ClerkLoaded>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Home;
