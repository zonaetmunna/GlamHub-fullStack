import Sidebar from "@/app/_components/sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <div className="flex flex-grow">
        <Sidebar />
        <div>
          {/* <nav /> */}
          <div className="container mx-auto p-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
