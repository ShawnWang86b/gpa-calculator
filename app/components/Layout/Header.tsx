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
    </header>
  );
};

export default Header;
