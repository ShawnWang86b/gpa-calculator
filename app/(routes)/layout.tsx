import Header from "@/app/components/Layout/Header";

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
