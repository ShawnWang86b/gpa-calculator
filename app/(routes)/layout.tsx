import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";
import SideBar from "../components/Layout/SideBar";
import MobileSideBar from "../components/Layout/MobileSideBar";
import MobileHeader from "../components/Layout/MobileHeader";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col item-center justify-start h-screen">
      <Header />
      <div className="flex h-full">
        <MobileHeader />

        <SideBar className="hidden 2xl:flex" />

        <section className="flex h-full 2xl:pl-[120px]">{children}</section>
      </div>

      <Footer />
    </main>
  );
};

export default DashboardLayout;
