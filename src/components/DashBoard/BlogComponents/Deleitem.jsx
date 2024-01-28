/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../../Hooks/DataFeachting/useAxios";
import Swal from "sweetalert2";

export default function DeleteItem({id}) {
  const Axios = useAxios();
  const Queryclient = useQueryClient();
  const Mutation = useMutation({
    mutationFn: async () => {
      const res = await Axios.delete(`/blog/${id}`);
      return res;
    },
    onSuccess: () => {
      Queryclient.invalidateQueries("MyBlogs");
      Swal.fire({
        title: "Deleted!",
        text: "Your Blog has been deleted.",
        icon: "success"
      });
    },
    onError: () => {
      toast.error("There is server side errro Occured");
    },
  });

  const handeldelete = () =>{
    Swal.fire({
      title: "Are you sure?",
      text:  "You won't be able to revert this!",
      icon:  "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Mutation.mutate()
      }
    });
  }

  return (
      <button onClick={handeldelete} data-tip="Delete The Blog" className="btn tooltip text-blue-950 btn-ghost btn-xs"><i className="fa-solid fa-trash-can"></i></button>
  );
}
