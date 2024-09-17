import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LoaderPinwheel } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4 z-10">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <Link href="/">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3 cursor-pointer">
            <Image src="/logo.png" height={40} width={40} alt="drizzle_logo" />
            <h1 className="text-2xl font-extrabold text-[#a4c3eb] tracking-wide">
              drizzle
            </h1>
          </div>
        </Link>
        <div className="flex gap-10 items-center">
          <Sheet>
            <SheetTrigger className="text-info hover:text-info-light">
              CONTACT
            </SheetTrigger>
            <SheetContent className="p-10">
              <SheetHeader>
                <SheetTitle>What is the goal?</SheetTitle>
                <SheetDescription>
                  {`  Our goal is to create a calculation feature that predicts students’ exact marks in the next assessment or exam.`}
                </SheetDescription>
                <SheetTitle>What problem does this feature solve?</SheetTitle>
                <SheetDescription>
                  Currently, many university students want to calculate how many
                  scores need to be acquired for the rest of the
                  assessment/exam/presentation, in order to achieve a certain
                  level for a specific subject. They need a simple way to get
                  the result directly.By consolidating various circumstances we
                  will create a calculator for multiple occasions, simplifying
                  the process for the end-user. While it costs some IT/UI
                  resources to build this feature, it will increase ‘课程表’
                  retention rate as a whole
                </SheetDescription>
                <SheetTitle>Report bugs</SheetTitle>
                <SheetDescription>
                  If you find any bugs, please contact author Email:
                  shawn.wang86b@gmail.com
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <ClerkLoading>
            <LoaderPinwheel className="h-5 w-5 animate-spin text-[#a4c3eb]" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/learning"
                signUpForceRedirectUrl="/learning"
              >
                <Button variant="ghost" size="lg" className="uppercase">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
