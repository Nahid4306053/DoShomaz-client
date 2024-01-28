/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useAuth } from "../../Context/Authinicetion";
import Header from "../../components/DashBoard/DashBoardBody/Header";
import InputBox from "../../components/Shared/InputBox";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../Hooks/DataFeachting/useAxios";
import uploadIMGBB from '../../Utils/UploadIMG'
export default function Profile() {
  const [readmood, setReadmood] = useState(true);
  const { currentUser } = useAuth();
  const [UploadIMG, setUploadIMG] = useState();
  const { displayName, email, photoURL, additionalInfo } = currentUser || {};
  const [profilepic, setProfilepic] = useState(photoURL);
  const {UpdateProfile} = useAuth()
  const [forminfo, setFormInfo] = useState({
    displayName,
    email,
    photoURL,
    additionalInfo,
  });
  const Axios = useAxios()

  const handelData = async (form) => {
    form.preventDefault();
    const formdata = {};
    const err = []
    formdata.displayName = form.target.displayName.value.trim();
    formdata.additionalInfo = form.target.additionalInfo.value.trim();
    const avatar = form.target.avatar.files;
    const type = ["image/jpeg", "image/png", "image/jpg"];
    if (avatar.length > 0) {
      if (avatar.length > 1 || !type.includes(avatar[0].type)) {
        toast.error("Upload A Profile img with type .jpg .png .jpeg");
        err.push("Upload A Profile img with type .jpg .png .jpeg");
      }
    } 
    if(formdata.displayName.length < 3){
    toast.error("Please Provide Your Name");
    err.push("Please Provide Your Name");
    }
    if(err.length === 0){
      try{
        if (avatar.length > 0) {
          const uploadIMG = await uploadIMGBB(avatar[0]);
          if (uploadIMG.data.data.display_url) {
            const newphotoURL = uploadIMG.data.data.display_url;
            const res = await UpdateProfile(formdata.displayName,newphotoURL);
            console.log(res)
          } else {
            toast.error("A problem occured whene save img");
          }
         
        } else{
           const res =   await UpdateProfile(formdata.displayName,'');
           if(res){
            setReadmood(true);
           }
          }
      }
      catch(err){
         toast.error(err?.message)
      } 
    }
    
   
  };
  return (
    <>
      <Header>Profile</Header>
      <form onSubmit={handelData} className="grid gap-10 lg:grid-cols-12 p-10">
        <div className="col-span-5 flex flex-col ">
          <div className="avatar mt-10">
            <div className=" mx-auto rounded-full">
              <img
                className="w-full rounded-full "
                src={
                  profilepic.trim() ? profilepic : "https://i.ibb.co/9ZV4gBG/user.png"
                }
                alt=""
              />
            </div>
          </div>
          {readmood ? (
            <div
              onClick={() => setReadmood(false)}
              className="btn mt-12 btn-warning text-white"
            >
              Update Profile
            </div>
          ) : (
            <div className="btn mt-12 relative btn-warning text-white">
             
              Choose Profile Picture{" "}
              <input
                type="file"
                onChange={(e) =>
                  setProfilepic(URL.createObjectURL(e.target.files[0]))
                }
                name="avatar"
                className="opacity-0 h-full w-full absolute"
              />{" "}
            </div>
          )}
        </div>
        <div className="col-span-7 pt-10 space-y-4">
          <InputBox readOnly={readmood} defaultValue={forminfo.displayName} required type="text" placeholder="Display Name" label="Display Name" name="displayName" ></InputBox>
          <InputBox value={forminfo.email} readOnly={true} type="text" placeholder="Email" label="Email (Not Editable)" ></InputBox>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">About Yourself Short</span>
            </label>
            <textarea name="additionalInfo" readOnly={readmood} defaultValue={forminfo.additionalInfo} className="textarea textarea-bordered text-base w-full " rows={5} placeholder="Bio" ></textarea>
          </div>
        </div>
       {!readmood && <div className="col-span-12 gap-4 flex justify-end">
          <div
            onClick={() => setReadmood(true)}
            className=" btn btn-error text-white"
            type="submit"
          >
            close
          </div>
          <button className="bg-blue-950 hover:bg-blue-950 btn text-white" type="submit">
            Save
          </button>
        </div>}
      </form>
    </>
  );
}
