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
import UploadIMG from "../../Utils/UploadIMG";
import useCategories from "../../Hooks/useCategories";
import placeholder from "/placeholder.png";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/DataFeachting/useAxios";
import useSingelBlog from "../../Hooks/UseSingelBlog";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Dashboard/DashBoardBody/Header";

export default function UpdateBlog() {
  const [err, setError] = useState();
  const formref = useRef();
  const { id } = useParams();
  const navigate= useNavigate()
  const [selctedCategorey, setSelectedCategorey] = useState();
  const [uploadedImg, SetImg] = useState(
    "https://i.ibb.co/bRVzNb9/placeholder.png"
  );
  const Axios = useAxios();
  const {
    Blog,
    error: blogErros,
    isError: blogisError,
    isLoading: blogisLoading,
    isSuccess: blogisSuccess,
  } = useSingelBlog(id);
  const { categories, error, isError, isLoading, isSuccess } = useCategories();
  // console.log(categories);

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
      navigate('/dashboard/my-blogs')
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
    formData.categorey = form.target.categorey.value;
    formData.description = form.target.description.value;
    const type = ["image/jpeg", "image/png", "image/jpg"];
    if (banner.length > 0) {
      if (banner.length > 1 || !type.includes(banner[0].type)) {
        toast.error("Upload A banner img with type .jpg .png .jpeg");
        err.push("Upload A banner img with type .jpg .png .jpeg");
      }
    }

    if (
      formData.title.trim() === "" ||
      formData.categorey.trim() === "" ||
      formData.description.trim() === ""
    ) {
      toast.error("All field Are ");
      err.push("All field Are ");
    }
    if (formData.description.trim().length < 150) {
      toast.error("Description Should be minimam 150 charecter");
      err.push("Description Should be minimam 150 charecter");
    }
    if (err.length === 0) {
      try {
        if (banner.length > 0) {
          const uploadIMG = await UploadIMG(banner[0]);
          if (uploadIMG.data.data.display_url) {
            formData.banner = uploadIMG.data.data.display_url;
            mutation.mutate(formData);
          } else {
            toast.error("A problem occured whene save img");
          }
        }
        else{
           mutation.mutate(formData);        
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    blogisSuccess ? (
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
          <div className="grid lg:grid-cols-2 gap-5 mt-5">
            <TextField
              
              id="title"
              defaultValue={Blog.data?.title}
              label="Blog Title"
              type="text"
              name="title"
            />

            <FormControl fullWidth>
              <InputLabel id="Categorey">Blog Categorey</InputLabel>
              <Select
                defaultValue={Blog.data?.categorey}
                labelId="Categorey"
                id="Categorey"
                
                name="categorey"
                label="Blog Categorey"
                value={selctedCategorey}
                onChange={(e) => setSelectedCategorey(e.target.value)}
              >
                {isSuccess &&
                  categories.data &&
                  categories.data.map((ele) => {
                    return (
                      <MenuItem key={ele._id} value={ele.category}>
                        {ele.category}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <div className="form-control col-span-2">
              <label className="label">
                {" "}
                <span className="label-text text-lg opacity-60">
                  Description
                </span>{" "}
              </label>

              <textarea
                value={Blog.data?.description}
                
                rows={5}
                className="textarea bg-transparent text-lg textarea-bordered"
                name="description"
                placeholder="Description"
              >
                {" "}
              </textarea>

              <button className="btn bg-blue-950 text-warning hover:bg-blue-950 mt-10">
                Update now
              </button>
            </div>
          </div>
        </form>
      </>
      
    ):<p className=" p-10 text-center">Lodaing...</p>
  );
}
