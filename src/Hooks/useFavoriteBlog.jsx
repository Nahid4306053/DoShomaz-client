import { useQuery } from '@tanstack/react-query';

import useAxios from './DataFeachting/useAxios';
import { getMarkedBlog } from '../Utils/ControllMark';

export default function useFavoriteBlog(page,limit) {
  const Tpage = page || 1 ;                  
  const Tlimit = limit || 10 ;                   
  const axios = useAxios();
    const fetchBlogs = async () => {
     const res = await axios.post(`/blog/favorite?page=${Tpage}&limit=${Tlimit}`,{ids:getMarkedBlog()});
      return res;
     };
    const { data: Blogs, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["favorite", page,limit ],
       queryFn: () => fetchBlogs(),
     });  

  return {Blogs, isLoading, isError, error , isSuccess}
}
