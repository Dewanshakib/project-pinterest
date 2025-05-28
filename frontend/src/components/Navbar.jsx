import {Link} from "react-router-dom"
import Logo from "../assets/images/Pinterest_Logo.png"

const Navbar = ({user}) => {

  return (
    <div>
      <div className="bg-white shadow-sm">
        <div className="px-4 py-2 mx-auto flex justify-between items-center">
          <Link to='/' className='flex items-center mr-5'>
            <img className='h-6 w-6 mr-1 md:mr-2' src={Logo} alt="Pinterest_Logo" />
            <span className='text-red-600 font-bold text-xl'>Pinterest</span>
          </Link>

          <div className="flex items-center space-x-4 w-[200px]">
            <Link className='text-gray-700 hover:text-gray-900' to='/'>Home</Link>
            <Link className='text-gray-700 hover:text-gray-900' to='/create'>Create</Link>
            <Link className='w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center text-xl text-gray-700' to='/account'>
              <p>{user.name.slice(0,1)}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar