/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import toast from "react-hot-toast";
import "../../scss/Commentform.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../Hooks/DataFeachting/useAxios";
import { useRef } from "react";
export default function Comment_form({blogId}) {
  const Axios = useAxios();
  const formref = useRef(); 
  const Queryclient = useQueryClient()
  const Mutation = useMutation({
    mutationFn: async (data)=>{
      const res = await Axios.post('/comment',data)
      return res;
    },
    onSuccess : ()=>{
      formref.current.reset()
      Queryclient.invalidateQueries('Comments')
    },
    onError : (err)=>{
     toast.error("There is server side errro Occured");
    
    }
  })
  const handelComment = (form) =>{
  form.preventDefault();
   const formdata = {};
   formdata.comment = form.target.comment.value.trim();
   if(formdata.comment){
    formdata.blog_id = blogId;  
    Mutation.mutate(formdata);
   }
   else{
      toast.error('Please write your comment')
   }
  }
  return (
    <form ref={formref} onSubmit={handelComment} className="p-0 mt-24 w-full  comment-2">
      <div className="col-12">
        <textarea id="text" required name="comment" className="form-control" placeholder="Masage" cols="30" rows="5" aria-label="With textarea" ></textarea>
      </div>
      <div className="mt-5 flex justify-end p-0">
        <button type="submit" className="btn btn-2 mt-1 py-3 px-5">
          Post Comment
        </button>
      </div>
    </form>
  );
}
