import { useRef } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"


export default function Search() {
  const searchinput = useRef()
  const navigate = useNavigate();
  const handelsearch = ()=>{
   if(searchinput.current.value.trim()){
    navigate(`/filter?search=${searchinput.current.value.trim()}`)
   }
   else{
    toast.error("Please Type Something")
   }
  }
  return (
       <div className=" rounded-full w-full bg-[#002347] px-4 py-1">
     <label className="flex items-center"> 
       <input ref={searchinput} type="text"  placeholder="Search posts" className="text-white placeholder:text-white text-lg bg-[#002347] w-full px-2 py-2 focus:outline-none"  /> 
       <button onClick={handelsearch} className=' cursor-pointer text-lg px-2 py-2 font-bold '><i className='text-white icofont-search font-bold'></i></button>
     </label>
   </div>
  )
}
