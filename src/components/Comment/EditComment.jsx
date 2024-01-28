/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/DataFeachting/useAxios";
// import "../scss/Commentform.scss";
export default function EditComment({ currentComment, setCurrentComment }) {
  const Axios = useAxios();
  const formref = useRef();
  const Queryclient = useQueryClient();
  const Mutation = useMutation({
    mutationFn: async (data) => {
      const res = await Axios.patch(
        `/comment/${currentComment._id}`,
        data
      );
      return res;
    },
    onSuccess: () => {
      formref.current.reset();
      Queryclient.invalidateQueries("Comments");
      setCurrentComment("");
    },
    onError: (err) => {
      toast.error("There is server side errro Occured");
    },
  });
  const handelReplay = (form) => {
    form.preventDefault();
    const formdata = {};
    formdata.comment = form.target.comment.value.trim();
    if (formdata.comment) {
      Mutation.mutate(formdata);
    } else {
      toast.error("Please write your comment");
    }
  };
  return (
    <form
      ref={formref}
      onSubmit={handelReplay}
      className="p-0 mt-10 w-full  comment-2"
    >
      <div className="col-12">
        <textarea
          defaultValue={currentComment.comment}
          style={{ height: 80 }}
          id="text"
          required
          name="comment"
          className="form-control"
          placeholder="Mesage"
          cols="30"
          rows="2"
          aria-label="With textarea"
        ></textarea>
      </div>
      <div className="mt-5 flex justify-end p-0">
        <div
          onClick={() => setCurrentComment("")}
          className="btn btn-sm btn-ghost    mt-1 py-0"
        >
          close
        </div>
        <button type="submit" className="btn  btn-ghost  btn-sm  mt-1 py-0">
          save
        </button>
      </div>
    </form>
  );
}
