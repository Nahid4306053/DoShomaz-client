import Search from "../Sidebar/Search";

import BlogTags from "../Blog/BlogTags";

export default function DefultSidebar() {
  return (
    <div className="col-span-full mt-10 lg:pl-10 flex flex-col items-end lg:col-span-4">
      <Search />
      <br />
      <img src="https://i.ibb.co/hVLxxb9/add.png" alt="" />
      <br />
      <br />
      <img src="https://househunterv2.netlify.app/images/ad_banner.png" alt="" />
      <BlogTags />
    </div>
  );
}
