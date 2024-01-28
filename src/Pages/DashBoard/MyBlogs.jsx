/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import TableFoot from "../../components/DashBoard/DashBoardBody/TableFoot.jsx";
import TableRow from "../../components/Dashboard/DashBoardBody/TableRow.jsx";
import Header from "../../components/Dashboard/DashBoardBody/Header.jsx";
import LoadingComponet from "../../components/Shared/LoadingComponent";
import ErrorComponent from "../../components/Shared/ErrrorComponet";
import useMyBlogs from "../../Hooks/useMyblogs.jsx";
import { useState } from "react";
import Deleitem from "../../components/DashBoard/BlogComponents/Deleitem.jsx";

export default function MyBlogs() {
  const [page, setpage] = useState(1);
  const { MyBlogs, error, isError, isLoading, isSuccess } = useMyBlogs(page, 8);

  return (
    <>
      <Header>My Blogs</Header>
      <div className="myblogs p-5">
        <div className="overflow-x-auto custom-scrollbar  table-pin-rows lg:h-[550px] mt-12  bg- md:h-[600px] h-[400px]">
          <table className="table  border-white ">
            <thead className="h-14  text-sm">
              <tr>
                <th>Banner</th>
                <th>Title</th>
                <th>Catgorey</th>
                <th>Action</th>
              </tr>
            </thead>
            {isLoading ? (
              <div className="w-full flex justify-center">
                <LoadingComponet />
              </div>
            ) : isError ? (
              <div className="w-full flex justify-center">
                <ErrorComponent />
              </div>
            ) : (
              <tbody>
                {MyBlogs.data.Blogs.length > 0 ? (
                  MyBlogs.data.Blogs.map((ele) => {
                    return (
                      <TableRow key={ele._id} data={ele}>
                        
                        <th>
                          <Deleitem id={ele._id}></Deleitem>
                          <Link to={`/dashboard/update-blog/${ele._id}`}><button data-tip="Edit The Blog" className="btn tooltip btn-ghost btn-xs">
                          <i className="fa-solid fa-pen-to-square"></i>
                          
                          </button></Link> 
                          <Link to={`../../post/${ele._id}`}><button data-tip="View Full Blog" className="tooltip btn btn-ghost btn-xs">
                          <i className="fa-sharp fa-solid fa-square-info"></i>
                          </button></Link>
                          
                        </th>
                      </TableRow>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center ">
                      <h3 className="my-3 text-xl ">Your Haven't any  Blog</h3>
                      <Link to="/dashboard/add-blog">
                        <button className="btn bg-blue-950 hover:bg-blue-950 text-white capitalize btn-sm">
                          {" "}
                          Visit Add Blog Page{" "}
                        </button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
            {MyBlogs?.data?.totalData > 0 && (
              <TableFoot
                colSpan={5}
                page={page}
                setpage={setpage}
                totalData={MyBlogs?.data?.totalData}
              ></TableFoot>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
