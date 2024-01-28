/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/DataFeachting/useAxios";

export default function DeleteComment({id}) {
  const Axios = useAxios();
  const Queryclient = useQueryClient();
  const Mutation = useMutation({
    mutationFn: async () => {
      const res = await Axios.delete(`/comment/${id}`);
      return res;
    },
    onSuccess: () => {
      Queryclient.invalidateQueries("Comments");
    },
    onError: () => {
      toast.error("There is server side errro Occured");
    },
  });
  return (
    <li onClick={() => Mutation.mutate()}>
      {" "}
      <a>Delete</a>
    </li>
  );
}
