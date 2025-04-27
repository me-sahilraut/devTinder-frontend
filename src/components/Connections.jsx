import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get("/api/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-center my-10"> No Connections Found</h1>;

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>

        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col xl:flex-row justify-between items-center m-4 p-4 rounded-lg bg-[#231E39] mx-auto text-[#B3B8CD] sm:max-w-[60%] max-w-[90%] space-y-6 xl:space-y-0 xl:space-x-5"
            >
              <div className="flex flex-col xl:flex-row flex-1 items-center space-y-4 xl:space-y-0 xl:space-x-5">
                <div className="min-w-[160px] min-h-[160px] xl:min-w-[80px] xl:min-h-[80px] w-20 h-20 rounded-full ring-2 ring-cyan-400 overflow-hidden">
                  <img
                    alt="photo"
                    className="w-full h-full object-cover rounded-full"
                    src={photoUrl}
                  />
                </div>

                <div className="text-center xl:text-left">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about || "This is a default about of the user!"}</p>
                </div>
              </div>

              <div className="w-44 pb-5">
                <Link to={"/chat/" + _id}>
                  <button class="chat-btn p-5">Chat</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {/* 
      <div className="card uniwu-card">
        <div className="content">
          <div className="back">
            <div className="back-content">

              
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Connections;
