import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserConext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  // register
  async function RegisterUser(name, email, password, navigate) {
    setIsBtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      setUser(data.user);
      setIsAuth(true);
      toast.success(data.message);
      setIsBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsBtnLoading(false);
    }
  }

  // login
  async function LoginUser(email, password, navigate) {
    setIsBtnLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      setUser(data.user);
      setIsAuth(true);
      toast.success(data.message);

      setIsBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsBtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);

  async function getProfileData() {
    try {
      const { data } = await axios.get("/api/users/my-profile");
      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <UserConext.Provider
      value={{ LoginUser, RegisterUser, isAuth, isBtnLoading, user, loading }}
    >
      {children} <Toaster />{" "}
    </UserConext.Provider>
  );
};

export default UserProvider;

export const UserData = () => useContext(UserConext);
