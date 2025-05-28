import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast"

const PinContext = createContext();

const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [pin,setPin] = useState([])
  const [loading,setLoading] = useState(true)

  
  // get all pins
  async function fetchPins() {
    try {
      const { data } = await axios.get("/api/pin/all");
      setPins(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  // get single pin
  async function fetchPin(id) {
    try {
      const { data } = await axios.get(`/api/pin/${id}`);
      setPin(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  // update pin
  async function updatePin(id,title,pin,setEdit) {
    try {
      const {data} = await axios.put("/api/pin/"+id,{title,pin})
      toast.success(data.message)
      fetchPin(id)
      setEdit(false)
    } catch (error) {
      toast.error(error.respose.data.message)
    }
  }

  // add comment
  async function addComment(id,comment,setComment) {
    try {
      const {data} = await axios.post("/api/pin/comment/"+id,{comment})
      toast.success(data.message)
      fetchPin(id)
      setComment("")
    } catch (error) {
      toast.error(error.respose.data.message)
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return <PinContext.Provider value={{ pins ,loading,fetchPin,pin,updatePin,addComment}}>{children}</PinContext.Provider>;
};

export default PinProvider;

export const PinData = () => useContext(PinContext);
