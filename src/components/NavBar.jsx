import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };
  return (
    <div
      className="navbar shadow-md"
      style={{
        background: "#1e1b38", // Dark violet/navy tone - distinct from page bg
        color: "#ffffff",
      }}
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          👩‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-4 items-center">
          <div className="text-white font-semibold">
            Welcome, {user.firstName}
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring-2 ring-cyan-400">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#2d254e] rounded-box w-52 text-white"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge bg-yellow-500 text-black">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
