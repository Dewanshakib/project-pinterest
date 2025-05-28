
import {Link} from "react-router-dom"

const PinCard = ({pin}) => {

  return (
    <div>
        <div className="p-4 max-w-100 sm:1/2 md:1/3 lg:1/4">
            <div className="bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer">
                <img src={pin.image.url} alt="photo" className='w-full h-full'/>
                <div className="absolute inset-0 hover:bg-black/20 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Link className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' to={`./pin/${pin._id}`}>View Pin</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PinCard