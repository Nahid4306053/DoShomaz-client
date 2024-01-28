/* eslint-disable react/prop-types */
export default function Header({ children }) {
  return (
    <div className="header pl-10 sticky top-0 z-10   h-20 w-full   flex px-2 space-x-2 items-center  bg-slate-500  border-b-2">
      <h3 className="text-white">{children}</h3>
    </div>
  );
}
