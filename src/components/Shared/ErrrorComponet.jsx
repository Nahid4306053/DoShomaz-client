import Lottie from "lottie-react";
import Errorload from '../../assets/lottie/error.json'
export default function ErrorComponent() {
  return (
    <div className='w-full flex justify-center items-center p-10'>
      <Lottie animationData={Errorload}></Lottie>
    </div>
  )
}
