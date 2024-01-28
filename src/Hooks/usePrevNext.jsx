import { useQuery } from '@tanstack/react-query';
import useAxiosPublicV1 from './DataFeachting/useAxios';

export default function usePrevNext(id) {                  
  const axios = useAxiosPublicV1();
    const fetchPrevnext = async () => {
     const res = await axios.get(`/Blog/prevnext/${id}`);
      return res;
     };
    const { data: Blog, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["prevnext" , id],
       queryFn: () => fetchPrevnext(),
     });  

  return {Blog, isLoading, isError, error , isSuccess}
}
