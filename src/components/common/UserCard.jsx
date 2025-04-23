import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        "http://localhost:3000/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="bg-[#231E39] text-[#B3B8CD] rounded-xl shadow-2xl w-96 max-w-full  text-center px-6 py-8 transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.75)]">
      {/* <span className="absolute bg-yellow-400 text-[#231E39] font-bold text-sm px-3 py-1 rounded top-4 left-4">
        PRO
      </span> */}
      <img
        className="w-full  object-cover border-2 border-cyan-400 rounded-lg mx-auto mb-4"
        src={photoUrl}
        alt="user"
      />
      <h3 className="text-xl font-semibold mb-1">
        {firstName + " " + lastName}
      </h3>
      {age && gender && (
        <h6 className="uppercase text-sm mb-2">{`${age}, ${gender}`}</h6>
      )}
      <p className="text-sm leading-6 mb-5">{about}</p>
      <div className="flex justify-center gap-4">
        <button
          className="accept"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
        <button
          className="reject"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
