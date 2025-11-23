import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <LoaderIcon className="size-15 animate-spin text-white" />
    </div>
  )
}

export default PageLoader