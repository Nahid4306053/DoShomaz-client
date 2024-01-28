/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

export default function InputField({ placeholder, type, iconName, ...rest }) {
  return (
    <div className="form-control mt-4">
      <label className="input-group">
        <input
          type={type}
          placeholder={placeholder}
          {...rest}
          className="input input-bordered w-full placeholder:text-[#002347] placeholder:font-bold font-bold bg-[#ffffff] text-[#002347]"
        />
        <span className="bg-[#fdc632] text-[#002347] w-12 overflow-hidden font-bold">
          <i className={` text-[#002347] ${iconName}`}></i>
        </span>
      </label>
    </div>
  );
}
