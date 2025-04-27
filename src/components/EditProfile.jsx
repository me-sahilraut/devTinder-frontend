import { useState } from "react";
import UserCard from "./common/UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        "/api/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col lg:flex-row justify-center items-center  py-10 px-4">
        {/* Edit Form */}
        <div className="bg-[#231E39] rounded-2xl shadow-2xl p-8 w-full max-w-md ">
          <h2 className="text-3xl font-semibold text-center text-white">
            Edit Profile
          </h2>

          <label className="form-control  m-2">
            <span className="label-text text-indigo-300">First Name:</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full text-gray-900"
            />
          </label>
          <label className="form-control  m-2">
            <span className="label-text text-indigo-300">Last Name:</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full text-gray-900"
            />
          </label>
          <label className="form-control m-2">
            <span className="label-text text-indigo-300">Photo URL:</span>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full text-gray-900"
            />
          </label>
          <label className="form-control m-2">
            <span className="label-text text-indigo-300">Age:</span>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full text-gray-900"
            />
          </label>
          <label className="form-control m-2">
            <span className="label-text text-indigo-300">Gender:</span>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input input-bordered w-full text-gray-900"
            />
          </label>
          <label className="form-control m-2">
            <span className="label-text text-indigo-300">About:</span>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input input-bordered w-full text-gray-900"
            />
          </label>

          <p className="text-red-500 text-sm">{error}</p>
          <div className="flex justify-center">
            <button
              href="#"
              className="saveProfile btn"
              style={{ "--clr": "#149CEA" }}
              onClick={saveProfile}
            >
              Save profile
            </button>
            {/* <button
              className="btn btn-primary w-full mt-4"
             
            >
              Save Profile
            </button> */}
          </div>
        </div>

        {/* Preview Card */}
        <div className="max-w-md w-full flex justify-center">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
