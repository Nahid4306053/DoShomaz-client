import { useQuery } from '@tanstack/react-query';

import useAxiosPublicV1 from './DataFeachting/useAxios';

export default function useCategories() {
  const axios = useAxiosPublicV1();
    const fetchtripTypes = async () => {
     const res = await axios.get("/categories");
      return res;
      };

    const { data: categories, isLoading, isError, error,isSuccess } = useQuery({
       queryKey: ["categories"],
       queryFn: () => fetchtripTypes(),
     });  

  return {categories, isLoading, isError, error , isSuccess}
}
