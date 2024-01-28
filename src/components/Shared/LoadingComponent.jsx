import Lottie from "lottie-react";
import loading from '../../assets/lottie/loading.json'
export default function LoadingComponet() {
  return (
    <div className='w-full flex justify-center items-center p-10'>
      <Lottie animationData={loading}></Lottie>
    </div>
  )
}
