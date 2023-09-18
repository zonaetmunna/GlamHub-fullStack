import DashboardNavbar from "@/app/_components/(navigation)/dashboardNavbar";
import DashboardSidebar from "@/app/_components/(sidebar)/dashboardSidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <div className="flex flex-grow">
        <DashboardSidebar />
        <div>
          <DashboardNavbar />
          <div className="container mx-auto p-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
