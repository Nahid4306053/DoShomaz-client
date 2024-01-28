/* eslint-disable react/prop-types */

export default function DashBoardBody({ children }) {
  return (
    <div className="DashBoardSidebar overflow-y-auto w-[calc(100%-64px)] lg:w-[70%] xl:w-[75%] h-full">
      <div className="main_body overflow-y-auto h-[calc(100%-80px)]">
        {children}
      </div>
      <div className="header pl-10  h-20 w-full   flex px-2 space-x-2 items-center  bg-slate-500 shadow-lg border-t-2"></div>
    </div>
  );
}
