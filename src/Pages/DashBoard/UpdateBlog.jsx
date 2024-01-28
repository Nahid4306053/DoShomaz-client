/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
// import Header from "../../components/DashBoard/DashBoardBody/Header";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/DataFeachting/useAxios";
import useSingelBlog from "../../Hooks/UseSingelBlog";

import UploadIMG from "../../Utils/UploadIMG";
import Header from "../../components/Dashboard/DashBoardBody/Header";
import { useAuth } from "../../Context/Authinicetion";

export default function UpdateBlog() {
  const [err, setError] = useState();
  const formref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const {currentUser} = useAuth()
  const [uploadedImg, SetImg] = useState(
    "https://i.ibb.co/bRVzNb9/placeholder.png"
  );
  const Axios = useAxios();
  const { Blog, error: blogErros, isError: blogisError, isLoading: blogisLoading, isSuccess: blogisSuccess, } = useSingelBlog(id);
 
  useEffect(() => {
    if (blogisSuccess) {
      SetImg(Blog.data.banner);
    }
  }, [blogisSuccess]);
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await Axios.put(`/blog/update/${id}`, data);
      return res;
    },
    onSuccess: () => {
      toast.success("Your blog Update Successfully");
      navigate("/dashboard/my-blogs");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handelData = async (form) => {
    form.preventDefault();
    const err = [];
    const formData = {};
    formData.title = form.target.title.value;
    const banner = form.target.banner.files;

    formData.body = form.target.body.value;
    const type = ["image/jpeg", "image/png", "image/jpg"];
    if (banner.length > 0) {
      if (banner.length > 1 || !type.includes(banner[0].type)) {
        toast.error("Upload A banner img with type .jpg .png .jpeg");
        err.push("Upload A banner img with type .jpg .png .jpeg");
      }
    }

    if (
      formData.title.trim() === "" ||
      formData.body.trim() === ""
    ) {
      toast.error("All field Are ");
      err.push("All field Are ");
    }
    if (formData.body.trim().length < 150) {
      toast.error("Description Should be minimam 150 charecter");
      err.push("Description Should be minimam 150 charecter");
    }
    if (err.length === 0) {
      try {
        formData.author = currentUser._id;
        if (banner.length > 0) {
          const uploadIMG = await UploadIMG(banner[0]);
          if (uploadIMG.data.data.display_url) {
            formData.banner = uploadIMG.data.data.display_url;
            mutation.mutate(formData);
          } else {
            toast.error("A problem occured whene save img");
          }
        } else {
          mutation.mutate(formData);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return blogisSuccess ? (
    <>
      <Header>Update Blog</Header>
      <form ref={formref} onSubmit={handelData} className="p-10">
        <div className="bannerarea relative h-96 w-full rounded-lg overflow-hidden">
          <img
            src={uploadedImg}
            className="h-full obc w-full object-cover"
            alt=""
          />
          <input
            name="banner"
            onChange={(e) => SetImg(URL.createObjectURL(e.target.files[0]))}
            className="absolute top-0 h-full w-full cursor-pointer opacity-0"
            type="file"
            accept="image/jpeg,image/png,image/jpg"
          />
        </div>
        <div className="mt-5 ">Click on Banner to Upload Banner Img </div>
        <div className=" gap-5 mt-5">
          <TextField id="title" fullWidth defaultValue={Blog.data?.title} label="Blog Title" type="text" name="title" />


          <div className="form-control col-span-2">
            <label className="label">
              <span className="label-text text-lg opacity-60">Description</span>{" "}
            </label>
            <textarea
              defaultValue={Blog?.data?.body}
              rows={5}
              className="textarea bg-transparent text-lg textarea-bordered"
              name="body" 
              placeholder="Description"
            >
            </textarea>

            <button className="btn bg-blue-950 text-warning hover:bg-blue-950 mt-10">
              Update now
            </button>
          </div>
        </div>
      </form>
    </>
  ) : (
    <p className=" p-10 text-center">Lodaing...</p>
  );
}
