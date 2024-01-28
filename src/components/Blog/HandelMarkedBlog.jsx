/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {getMarkedBlog,AddMarkedBlogItem,DeleteMarkedBlog} from '../../Utils/ControllMark'
export default function HandelMarkedBlog({id}) {
   const [markedblog,setmarkedblog] = useState([]);       
   const handelMark = (bid) =>{
    if(markedblog.includes(bid)){
         DeleteMarkedBlog(bid)
    }
    else{ 
           AddMarkedBlogItem(bid)
    }  
     setmarkedblog(getMarkedBlog);
   }


  useEffect(()=>{
       setmarkedblog(getMarkedBlog())
  },[])
  return (

    <div onClick={()=>handelMark(id)} data-tip={markedblog.includes(id) ? "Unmark" : "Mark"} className="tooltip">
      <i  className={`fa-sharp  block cursor-pointer ${markedblog.includes(id) ? "fa-solid" : "fa-regular"}  fa-heart text-blue-950 text-xl p-1 rounded-lg px-2 bg-base-300 `}></i>
    </div>
  );
}
