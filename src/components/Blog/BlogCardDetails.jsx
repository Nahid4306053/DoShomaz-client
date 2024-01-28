/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import moment from "moment";

import GoogleIcons from "../GoogleIcons";
import "../../scss/BlogCard.scss";
export default function BlogCardDetails({ data }) {
  return (
    <div className="col-span-12 md:col-span-3">
      <div className="info my-4 mr-2">
        <ul className="space-y-5">
          <li>
            <p>
              <a>Etartainment,</a>
              <a className="active">{data?.categorey}</a>
              <br />
              <a>Politics,</a>
              <a>Country</a>
            </p>
          </li>
          <li className="infos flex justify-end items-center ">
            <a>{data?.author?.displayName}</a>
            <GoogleIcons
              classess="font-bold ml-1 text-[#002347]"
              name="person"
            />
          </li>
          <li className="infos flex justify-end items-center ">
            <a>{moment(data.updatedAt).format("Do MMM YYYY")}</a>
            <GoogleIcons
              classess="font-bold ml-1 text-[#002347]"
              name="calendar_month"
            />
          </li>
          <li className="infos flex justify-end items-center ">
            <a>
              {data?.views.length < 10
                ? "0" + data?.views.length
                : data?.views.length}{" "}
              Views
            </a>
            <GoogleIcons
              classess="font-bold ml-1 text-[#002347]"
              name="visibility"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
