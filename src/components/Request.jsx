import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        "/api/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/user/request/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <>
            <div
              key={_id}
              className=" flex flex-1 flex-col xl:flex-row justify-between items-center m-4 p-4 rounded-lg bg-[#231E39]  mx-auto text-[#B3B8CD] sm:max-w-[60%] max-w-[90%] space-x-5"
            >
              <div className="flex flex-col xl:flex-row flex-1  items-center space-y-6 xl:space-x-5">
                <div
                  className=" min-w-[160px]
min-h-[160px]    xl:min-w-[80px] xl:min-h-[80px] w-20 h-20 rounded-full ring-2 ring-cyan-400 overflow-hidden"
                >
                  <img
                    alt="user"
                    src={photoUrl}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="text-center xl:text-left    ">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>
                    {
                      "This is a default about of the user! This is a default about of the user! "
                    }
                  </p>
                </div>
              </div>

              <div className="flex flex-[0.5] items-center justify-center pb-5 space-x-5">
                <button
                  className="accept"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Accept
                </button>
                <button
                  className="reject"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Requests;
