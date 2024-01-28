import { useQuery } from '@tanstack/react-query';

import useAxios from './DataFeachting/useAxios';

export default function useBlogs(page,limit,sort,categorey) {
  const Tpage = page || 1 ;                  
  const Tlimit = limit || 10 ;                  
  const axios = useAxios();
    const fetchPackages = async () => {
     const res = await axios.get(`/blog/all?page=${Tpage}&limit=${Tlimit}${categorey ? "&categorey="+categorey : ""}${categorey ? "&sort="+sort : ""}`);
      return res;
     };
    const { data: Blogs, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["Blogs", page,limit , categorey ? categorey : ""],
       queryFn: () => fetchPackages(),
     });  

  return {Blogs, isLoading, isError, error , isSuccess}
}
