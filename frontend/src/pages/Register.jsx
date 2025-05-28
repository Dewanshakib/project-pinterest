import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingBtnAuth } from "../components/Loading";

const Register = () => {

  const [name,setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const { RegisterUser, isBtnLoading } = UserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    RegisterUser(name,email, password, navigate);
  };

  return (
   <div className="min-h-screen flex justify-center items-center px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <div className="flex justify-center mb-4">
          <img src="Pinterest_Logo.png" alt="pinterest logo" className="h-12" />
        </div>
        <h2 className="text-center font-semibold text-2xl mb-6">
          Register to Pinterest
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 block"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="common-input"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="common-input"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="common-input"
            />
          </div>
       
            <button className="common-btn" type="submit" disabled={isBtnLoading}>
              {isBtnLoading ? <LoadingBtnAuth/> : "Register"}
            </button>
          
        </form>
        <div className="flex items-center gap-3 mt-3">
          <hr className="w-full text-gray-300" />
          <span className="text-sm">OR</span>
          <hr className="w-full text-gray-300" />
        </div>
        <div className="w-full text-center mt-3">
          <span className="text-sm">
            Already have an account?
            <Link className="font-semibold hover:underline" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register