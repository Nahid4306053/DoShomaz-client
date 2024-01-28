/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import _ from "lodash";

import "../../scss/BlogPagination.scss";
import { useEffect } from "react";
export default function BlogPagination({totaldata,page,setPage}) {
  const totalpage = Math.ceil(totaldata / 5);

  return (
    <div className="grid mt-15 ">
      {/*
    <!-- this is content part --> */}
      <div className="col-span-12 w-full   ">
        <div className="pagin mt-5 flex items-center w-full">
          <nav className="mx-auto" aria-label="Page navigation example ">
            <div className="pagination flex m-0 p-0">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="page-item cursor-pointer" > 
              <div className="page-link"> <i className="far fa-angle-left font-bold"></i> </div> 
              </button>

              {[...Array(totalpage).keys()].map((ele,ind)=>{ return ( <button key={ind} onClick={()=>setPage(ind + 1)} className="page-item "> 
              <div className={`page-link text-sm ${page === (ind + 1)  ? "active" : "bg-[#002347c0]"}`}>{ind+1}</div> 
              </button> ) })}

              <button disabled={totalpage === page} onClick={() => setPage(page + 1)} className="page-item cursor-pointer" > 
              <div className="page-link"> <i className="far fa-angle-right font-bold"></i> </div> 
              </button>
            </div>
          </nav>
        </div>
        {/* <!-- this is content part --> */}
      </div>
    </div>
  );
}
