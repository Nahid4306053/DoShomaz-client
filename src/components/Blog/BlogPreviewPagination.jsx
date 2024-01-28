/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import media from '../../assets/media.webp'
import '../../scss/BlogPreviewPagination.scss' 
import { Link } from 'react-router-dom';
import usePrevNext from '../../Hooks/usePrevNext';
import LoadingComponet from '../Shared/LoadingComponent';
import ErrorComponent from '../Shared/ErrrorComponet';

export default function BlogPreviewPagination({id}) {
  const {Blog,error,isError,isLoading,isSuccess} = usePrevNext(id)
    return (
         isLoading ? <div className='w-full max-h-screen flex justify-center items-center'><LoadingComponet></LoadingComponet></div>
        : isError ? <div className='w-full max-h-screen flex justify-center items-center'><ErrorComponent></ErrorComponent></div>
        :    <div  className="bottom-section mt-5 flex justify-between w-full ">

       { 
        Blog?.data?.prev ?
        <div className="media pages-turn flex items-center mt-4">
           <Link className="flex pages mr-5"  to={`/post/${Blog?.data?.prev?._id}`}>
               <img className='h-14 w-24' src={Blog?.data?.prev ? Blog?.data?.prev.banner : media} alt="" />
               <div className="ico-arow">
                   <i className="icofont-arrow-left text-white"></i>
               </div>
           </Link>

           <div className="media-body">
               <p>Previous Post</p>
               <div className="p-0 d-flex ">
                   <h4 className='text-[color:#002347] font-semibold -mt-1 cursor-pointer'>{Blog?.data?.prev.title.slice(1,20)+"..."}</h4>
               </div>
           </div>
       </div>
       :
       <p></p>
       }


       
      {
          Blog?.data?.next ?

         <div className="media pages-turn flex align-items-center mt-4">
         <div className=" text-end">
             <p>Next Post</p>
             <div className="p-0 d-flex ">
                 <h4 className='text-[color:#002347] font-semibold -mt-1 cursor-pointer' >{"..."+  Blog?.data?.next?.title.slice(1,20)}</h4>
             </div>
             
         </div>
         <Link  className="flex pages ml-5" to={`/post/${ Blog?.data?.next?._id}`}>
             <img className='h-14 w-24' src={ Blog?.data?.next ?  Blog?.data?.next?.banner : media} alt=""/>
             <div className="ico-arow">
                 <i className="icofont-arrow-right text-white"></i>
             </div>
         </Link>
       </div>
       :
       <p></p>
      }

  </div>    
 

  )
}
