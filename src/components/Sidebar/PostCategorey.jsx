/* eslint-disable no-unused-vars */

import "../../scss/Postcategorey.scss";
import useBlogCountByCatgorey from '../../Hooks/useBlogCountByCatgorey'
import LoadingComponet from "../Shared/LoadingComponent";
import ErrorComponent from "../Shared/ErrrorComponet";
import { Link } from "react-router-dom";
export default function PostCategorey() {
  const {Blog,error,isError,isLoading,isSuccess} = useBlogCountByCatgorey()
  return (
    isLoading ? (
      <div className="w-full max-h-screen flex justify-center items-center">
        <LoadingComponet></LoadingComponet>
      </div>
    ) : isError ? (
      <div className="w-full max-h-screen flex justify-center items-center">
        <ErrorComponent></ErrorComponent>
      </div>
    ) : (
      Blog?.data && <ul className="  py-2 w-full categorey">
      <h4 className="sub-title mt-5">Post Categories</h4>
      {Blog.data.map((ele,ind)=>{
        return <li key={ind}> <Link to={`/filter?categorey=${ele.category}`}>{ele.category}</Link> <p>{ele.count < 10 ? "0"+ele.count : ele.count}</p> </li>
      })

      }
    </ul>)
  );
}
