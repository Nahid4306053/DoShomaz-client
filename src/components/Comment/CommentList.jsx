/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import moment from "moment";
import { useState } from "react";
import useComments from "../../Hooks/useComments";
import "../../scss/CommentList.scss";
import ReplayForm from "./ReplayForm";
import ErrorComponent from "../Shared/ErrrorComponet";
import LoadingComponet from "../Shared/LoadingComponent";
export default function CommentList({ id }) {
  const [currentCommentId, setCureentCommentID] = useState();
  const { Comments, error, isLoading, isError, isSuccess } = useComments(id);

  return isLoading ? (
    <div className="w-full max-h-screen flex justify-center items-center">
      <LoadingComponet></LoadingComponet>
    </div>
  ) : isError ? (
    <div className="w-full max-h-screen flex justify-center items-center">
      <ErrorComponent></ErrorComponent>
    </div>
  ) : (
    <div className="comment ">
      <h4 className="text-[#002347] font-bold text-center mt-24 text-2xl">
        Comment {Comments.data.length}
      </h4>
      <ul>
        {Comments.data.length > 0 ? (
          Comments.data.map((ele) => {
            return (
              <li key={ele._id}>
                <div className="commentItems come ">
                  <div className="media flex items-center mt-8">
                    <a className="flex pages mr-5">
                      {" "}
                      <img
                        className="h-16 w-16 object-cover"
                        src={
                          ele?.commenter?.photoURL ||
                          "https://i.ibb.co/XkqVpKX/1682708266984.jpg"
                        }
                        alt=""
                      />{" "}
                    </a>

                    <div className="">
                      <div className="p-0 flex ">
                        <p className="text-[color:#002347;] font-semibold">
                          {ele?.commenter?.displayName}
                        </p>
                      </div>
                      <p className="text-sm  -mt-1">
                        {moment(ele.createdAt).format("MMMM Do YYYY, h:mm A")}
                      </p>
                      <p className="mt-1">{ele.comment}</p>
                    </div>
                  </div>
                  <a
                    className="Replay cursor-pointer"
                    onClick={() =>
                      setCureentCommentID({
                        id: ele._id,
                        name: ele?.commenter?.displayName,
                      })
                    }
                  >
                    Reply
                  </a>
                </div>

              
              </li>
            );
          })
        ) : (
          <p className="text-xl text-center text-blue-950 mt-14">
            No comment Found
          </p>
        )}
      </ul>
    </div>
  );
}
