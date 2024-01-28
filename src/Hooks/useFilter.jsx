import { useQuery } from '@tanstack/react-query';

import useAxios from './DataFeachting/useAxios';

export default function useFilter(page,limit,sort,query) {
  const Tpage = page || 1 ;                  
  const Tlimit = limit || 10 ;                   
  const axios = useAxios();
    const fetchBlogs = async () => {
     const res = await axios.get(`/blog/filter?page=${Tpage}&limit=${Tlimit}${sort ? "&sort="+sort : ""}${query || ''}`);
      return res;
     };
    const { data: Blogs, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["Filter", page,limit , query ? query : ""],
       queryFn: () => fetchBlogs(),
     });  

  return {Blogs, isLoading, isError, error , isSuccess}
}
