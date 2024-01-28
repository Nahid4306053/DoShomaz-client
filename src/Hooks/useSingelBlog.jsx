import { useQuery } from '@tanstack/react-query';
import useAxiosPublicV1 from './DataFeachting/useAxios';

export default function useSingelBlog(id) {                  
  const axios = useAxiosPublicV1();
    const fetchblog = async () => {
     const res = await axios.get(`/Blog/singel/${id}`);
      return res;
     }; 
    const { data: Blog, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["SingelBlog" , id],
       queryFn: () => fetchblog(),
     });  

  return {Blog, isLoading, isError, error , isSuccess}
}
