import DashBoardSidebar from "../components/DashBoard/DashBoardSidebar";
import DashBoardBody from "../components/DashBoard/DashBoardBody";
import { Outlet } from "react-router-dom";
export default function DashBoardlayout() {
  return (
    <div className="min-h-screen mt-14 flex justify-center items-center  container mx-auto">
      <div className="px-5 w-full">
        <div className="lg:h-[800px] flex w-full md:h-[700px] h-[600px] bg-base-300 rounded-lg overflow-y-auto overflow-hidden">
          <DashBoardSidebar></DashBoardSidebar>
          <DashBoardBody> <Outlet></Outlet> </DashBoardBody>
        </div>
      </div>
    </div>
  );
}
