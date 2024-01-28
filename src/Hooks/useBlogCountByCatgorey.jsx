import { useQuery } from '@tanstack/react-query';
import useAxiosPublicV1 from './DataFeachting/useAxios';

export default function useBlogCountByCatgorey() {                  
  const axios = useAxiosPublicV1();
    const fetchBlogCountByCatgorey = async () => {
     const res = await axios.get(`/blog/blogcountbycatgorey`);
      return res;
     }; 
    const { data: Blog, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["blogcountbycatgorey"],
       queryFn: () => fetchBlogCountByCatgorey(),
     });  

  return {Blog, isLoading, isError, error , isSuccess}
}
