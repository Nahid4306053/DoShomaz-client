import Search from "../Sidebar/Search";

import PostCategorey from "../sidebar/PostCategorey";
import LatestPost from "./LatestPost";
import BlogTags from "../Blog/BlogTags";
import PopularPost from "./PopularPost";
export default function DefultSidebar() {
  return (
    <div className="col-span-full mt-10 lg:pl-10 flex flex-col items-end lg:col-span-4">
      <Search />
      <PopularPost />
      <LatestPost />
      <PostCategorey />
      <BlogTags />
    </div>
  );
}
