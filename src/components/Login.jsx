import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Login data:", { emailId, password });
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      console.log("res" + JSON.stringify(res));

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <input
            type="checkbox"
            id="chk"
            aria-hidden="true"
            checked={!isSignup}
            onChange={() => setIsSignup(!isSignup)}
          />

          <div className="signup">
            <form>
              <label htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" onClick={handleSignUp}>
                Sign up
              </button>
            </form>
          </div>

          <div className="login">
            <form>
              <label htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  // <div className="flex justify-center my-10">
  //   <div className="card bg-base-300 w-96 shadow-xl">
  //     <div className="card-body">
  //       <h2 className="card-title justify-center">
  //         {isLoginForm ? "Login" : "Sign Up"}
  //       </h2>
  //       <div>
  //         {!isLoginForm && (
  //           <>
  //             <label className="form-control w-full max-w-xs my-2">
  //               <div className="label">
  //                 <span className="label-text">First Name</span>
  //               </div>
  //               <input
  //                 type="text"
  //                 value={firstName}
  //                 className="input input-bordered w-full max-w-xs"
  //                 onChange={(e) => setFirstName(e.target.value)}
  //               />
  //             </label>
  //             <label className="form-control w-full max-w-xs my-2">
  //               <div className="label">
  //                 <span className="label-text">Last Name</span>
  //               </div>
  //               <input
  //                 type="text"
  //                 value={lastName}
  //                 className="input input-bordered w-full max-w-xs"
  //                 onChange={(e) => setLastName(e.target.value)}
  //               />
  //             </label>
  //           </>
  //         )}
  //         <label className="form-control w-full max-w-xs my-2">
  //           <div className="label">
  //             <span className="label-text">Email ID:</span>
  //           </div>
  //           <input
  //             type="text"
  //             value={emailId}
  //             className="input input-bordered w-full max-w-xs"
  //             onChange={(e) => setEmailId(e.target.value)}
  //           />
  //         </label>
  //         <label className="form-control w-full max-w-xs my-2">
  //           <div className="label">
  //             <span className="label-text">Password</span>
  //           </div>
  //           <input
  //             type="password"
  //             value={password}
  //             className="input input-bordered w-full max-w-xs"
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //         </label>
  //       </div>
  //       <p className="text-red-500">{error}</p>
  //       <div className="card-actions justify-center m-2">
  //         <button
  //           className="btn btn-primary"
  //           onClick={isLoginForm ? handleLogin : handleSignUp}
  //         >
  //           {isLoginForm ? "Login" : "Sign Up"}
  //         </button>
  //       </div>

  //       <p
  //         className="m-auto cursor-pointer py-2"
  //         onClick={() => setIsLoginForm((value) => !value)}
  //       >
  //         {isLoginForm
  //           ? "New User? Signup Here"
  //           : "Existing User? Login Here"}
  //       </p>
  //     </div>
  //   </div>
  // </div>
};
export default Login;
