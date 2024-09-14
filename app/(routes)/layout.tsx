import Header from "@/app/components/Layout/Header";
import Footer from "@/app/components/Layout/Footer";
import SideBar from "@/app/components/Layout/SideBar";
import MobileHeader from "@/app/components/Layout/MobileHeader";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex flex-col">
      <Header />
      <section>{children}</section>
    </main>
  );
};

export default DashboardLayout;
