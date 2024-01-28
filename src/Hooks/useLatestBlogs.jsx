import { useQuery } from '@tanstack/react-query';

import useAxios from './DataFeachting/useAxios';

export default function useLatestBlogs(page,limit,sort,) {
  const Tpage = page || 1 ;                  
  const Tlimit = limit || 10 ;                  
  const axios = useAxios();
    const fetchPackages = async () => {
     const res = await axios.get(`/blog/all?page=${Tpage}&limit=${Tlimit}${sort ? "&sort=true" : ""}`);
      return res;
     };
    const { data: Blogs, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["LatestBlogs", page,limit ],
       queryFn: () => fetchPackages(),
     });  

  return {Blogs, isLoading, isError, error , isSuccess}
}
