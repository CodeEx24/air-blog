import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="h-auto min-h-screen flex flex-col">
      <Header />
      <main className=" flex flex-grow w-full ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
