/* eslint-disable no-unused-vars */
import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/DataFeachting/useAxios";

import UploadIMG from "../../Utils/UploadIMG";
import Header from "../../components/DashBoard/DashBoardBody/Header";
import { useAuth } from "../../Context/Authinicetion";

export default function HandelBlog() {
  const [err, setError] = useState();
  const formref = useRef();

  const [uploadedImg, SetImg] = useState(
    "https://i.ibb.co/bRVzNb9/placeholder.png"
  );
  const Axios = useAxios();
  const {currentUser} = useAuth()
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await Axios.post("/blog", data);
      return res;
    },
    onSuccess: () => {
      toast.success("Your blog Publish Successfully");
      formref.current.reset();
      SetImg("https://i.ibb.co/bRVzNb9/placeholder.png");
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
    if (!banner || banner.length > 1 || !type.includes(banner[0].type)) {
      toast.error("Upload A banner img with type .jpg .png .jpeg");
      err.push("Upload A banner img with type .jpg .png .jpeg");
    }
    if (formData.title.trim() === "" || formData.body.trim() === "") {
      toast.error("All field Are Required");
      err.push("All field Are Required");
    }
    if (formData.body.trim().length < 150) {
      toast.error("Descrition Should be minimam 150 charecter");
      err.push("Descrition Should be minimam 150 charecter");
    }
    if (err.length === 0) {
      try {
        const uploadIMG = await UploadIMG(banner[0]);
        if (uploadIMG.data.data.display_url) {
          formData.author = currentUser._id;
          formData.banner = uploadIMG.data.data.display_url;
          mutation.mutate(formData);
        } else {
          toast.error("A problem occured whene save img");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      <Header>Add New Blog</Header>
      <form ref={formref} onSubmit={handelData} className="p-10">
        <div className="bannerarea relative h-96 w-full rounded-lg overflow-hidden">
          <img src={uploadedImg} className="h-full obc w-full object-cover" alt="" />
          <input
            name="banner"
            required
            onChange={(e) => SetImg(URL.createObjectURL(e.target.files[0]))}
            className="absolute top-0 h-full w-full cursor-pointer opacity-0"
            type="file"
            accept="image/jpeg,image/png,image/jpg"
          />
        </div>
        <div className="mt-5 ">Click on Banner to Upload Banner Img </div>
        <div className="mt-5">
          <TextField
            required
            id="title"
            fullWidth
            label="Blog Title"
            type="text"
            name="title"
          />
          <div className="form-control col-span-2">
            <label className="label">
   
              <span className="label-text text-lg opacity-60">Descrition</span>
            </label>
            <textarea
              required
              rows={5}
              className="textarea bg-transparent text-lg textarea-bordered"
              name="body"
              placeholder="Descrition"
            >
              {" "}
            </textarea>
            <button className="btn bg-blue-950 text-warning hover:bg-blue-950 mt-10">
              Publish now
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
