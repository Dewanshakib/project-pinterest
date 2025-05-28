import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { LoadingBtnMain } from "../components/Loading";
import { BadgePlus, PenLine, SquarePlus, Trash2 } from "lucide-react";

const PinPage = ({ user }) => {
  const params = useParams().id;
  const { pin, fetchPin, loading, updatePin, addComment } = PinData();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinVal, setPinVal] = useState("");

  // toggle edit btn
  const toggleEditBtn = () => {
    setTitle(pin.title);
    setPinVal(pin.pin);
    setEdit(!edit);
  };

  // update
  const updateHandler = () => {
    updatePin(pin._id, title, pinVal, setEdit);
  };

  const [comment, setComment] = useState("");
  // comment handler
  const commentHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  useEffect(() => {
    fetchPin(params);
  }, [params]);

  // console.log(pin.comments);
  // console.log(user);

  return (
    <div>
      {pin && (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
          {loading ? (
            <LoadingBtnMain />
          ) : (
            <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl">
              <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg rounded-l-lg md:rounded-t-none flex items-center">
                <img
                  src={pin?.image?.url}
                  alt="photo"
                  className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  {edit ? (
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title"
                      className="border border-gray-300 outline-none px-3 py-2 rounded-md w-70"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{pin.title}</h1>
                  )}

                  {pin.ownedBy && pin.ownedBy._id === user._id && (
                    <button
                      onClick={toggleEditBtn}
                      className="hover:text-cyan-600 hover:cursor-pointer"
                    >
                      <PenLine />
                    </button>
                  )}

                  {pin.ownedBy && pin.ownedBy._id === user._id && (
                    <button className="hover:text-red-600 hover:cursor-pointer">
                      <Trash2 />
                    </button>
                  )}
                </div>

                {edit ? (
                  <input
                    value={pinVal}
                    onChange={(e) => setPinVal(e.target.value)}
                    placeholder="Enter pin"
                    className="border border-gray-300 outline-none px-3 py-2 rounded-md w-70 mb-4"
                  />
                ) : (
                  <p>{pin.pin}</p>
                )}

                {edit && (
                  <button
                    onClick={updateHandler}
                    className="w-70 py-2 bg-red-600 hover:bg-red-600 text-white font-medium mb-4 hover:cursor-pointer rounded-sm"
                  >
                    Update
                  </button>
                )}

                {pin.ownedBy && (
                  <div className="flex items-center justify-between border-b border-b-gray-300 pb-4 mb-4">
                    <div className="flex items-center">
                      <Link to={`/user/${pin.ownedBy._id}`}>
                        <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                          <span className="font-bold">
                            {pin.ownedBy.name.slice(0, 1)}
                          </span>
                        </div>
                      </Link>
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">
                          {pin.ownedBy.name}
                        </h2>
                        <p className="text-gray-500">
                          {pin.ownedBy.followers.length} Followers
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center mt-4">
                  <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center mr-4">
                    <span className="font-bold">
                      {pin.ownedBy && pin.ownedBy.name.slice(0, 1)}
                    </span>
                  </div>

                  <form onSubmit={commentHandler} className="flex-1 flex">
                    <input
                      type="text"
                      className="flex-1 border rounded-lg p-2"
                      placeholder="Enter comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="ml-2 bg-red-500 px-4 py-2 rounded-md text-white"
                    >
                      <BadgePlus />
                    </button>
                  </form>
                </div>

                <hr className="text-gray-300 mt-4" />

                <div className="overflow-y-auto mt-3 h-30 p-4 bg-gray-200">
                  {pin.comments &&
                    pin.comments.map((e, i) => (
                      <div
                        className="flex justify-between items-center"
                        key={i}
                      >
                        <div className="flex items-center">
                          <div className="mr-5">
                            <Link to={`/user/${e._id}`}>
                              <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                                <span className="font-bold">
                                  {e.name.slice(0, 1)}
                                </span>
                              </div>
                            </Link>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h1 className="font-bold">{e.name}</h1>
                            <p className="text-sm font-medium text-gray-700 mb-3">
                              {e.comment}
                            </p>
                          </div>
                        </div>

                        {e.user === user._id && (
                          <button className="hover:text-red-600 hover:cursor-pointer">
                            <Trash2 size={20}/>
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinPage;
