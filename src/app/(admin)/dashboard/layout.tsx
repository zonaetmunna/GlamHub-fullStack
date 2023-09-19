import DashboardNavbar from "@/app/_components/(navigation)/dashboardNavbar";
import DashboardSidebar from "@/app/_components/(sidebar)/dashboardSidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen">
      {/* Sidebar */}
      <div className=" bg-white shadow-lg rounded-r-md">
        <DashboardSidebar />
      </div>

      {/* Content */}
      <div className="flex-grow bg-white  rounded-l-md overflow-hidden">
        <DashboardNavbar />
        <div className="container mx-5 my-5 p-6 bg-gray-100 rounded-lg shadow-md">
          {children}
        </div>
      </div>
    </section>
  );
}
