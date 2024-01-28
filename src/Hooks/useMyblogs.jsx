import { useQuery } from '@tanstack/react-query';

import useAxios from './DataFeachting/useAxios';

export default function useMyBlogs(page,limit,sort,categorey) {
  const Tpage = page || 1 ;                  
  const Tlimit = limit || 10 ;                  
  const axios = useAxios();
    const fetchMyBlogs = async () => {
     const res = await axios.get(`/blog/my-blogs?page=${Tpage}&limit=${Tlimit}`);
      return res;
     };
    const { data: MyBlogs, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["MyBlogs", page,limit , categorey ? categorey : ""],
       queryFn: () => fetchMyBlogs(),
     });  

  return {MyBlogs, isLoading, isError, error , isSuccess}
}
