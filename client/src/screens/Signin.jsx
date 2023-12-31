import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { errorMessege } from "../components/ToastMesseges";
import axios from "axios";
import Loader from "../components/Loader";
import { authConfig, provider } from "../../firebase.config";

const Signin = () => {
  const [finder, setFinder] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (finder.length > 0 && password.length > 0) {
      setIsLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_AUTH_URL}/signin`,
          { finder, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          setIsLoading(false);
          errorMessege("Unmatched credentials!");
        });
    } else {
      errorMessege("All files must be provided!");
    }
  };

  //GOOGLE SIGN
  const signInWIthGoogle = () => {
    setIsLoading(true);
    signInWithPopup(authConfig, provider)
      .then((result) => {
        axios
          .post(
            `${import.meta.env.VITE_AUTH_URL}/signup-google`,
            {
              email: result.user.email,
              name: result.user.displayName,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            navigate("/dashboard");
          })
          .catch((err) => {
            setIsLoading(false);
            errorMessege("Google auth failed");
          });
      })
      .catch((error) => {
        setIsLoading(false);
        errorMessege("Google auth failed");
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        className="bg-white rounded w-96 py-4 px-3 flex items-center justify-center flex-col"
        onSubmit={handleSubmit}
      >
        <Link to={"/"} className="teko text-2xl text-blue-600 mb-3">
          hostFile.io
        </Link>
        <h3 className="text-2xl font-semibold text-slate-600 mb-1">Signin</h3>
        <p className="text-slate-500 mb-5 text-center">
          Sign in your file hosting account
        </p>
        <div className="w-11/12 mx-auto h-11 mb-2 relative">
          <input
            type="text"
            className="w-full h-11 ps-2 pe-10 outline-none border-slate-400 border rounded focus:border-blue-500"
            placeholder="Enter Username or Email"
            value={finder}
            onChange={(e) => setFinder(e.target.value)}
          />
        </div>
        <div className="w-11/12 mx-auto h-11 mb-2 relative">
          <input
            type={isPassword ? "password" : "text"}
            className="w-full h-11 ps-2 pe-10 outline-none border-slate-400 border rounded focus:border-blue-500"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`fa-regular ${
              isPassword ? "fa-eye" : "fa-eye-slash"
            } top-4 right-2 text-slate-500 absolute cursor-pointer`}
            onClick={() => {
              setIsPassword(!isPassword);
            }}
          ></i>
        </div>
        <button className="btn-form mt-3" type="submit">
          Sign In
        </button>
        <p className="mt-2 text-slate-600">
          Have't account yet?{" "}
          <Link
            to={"/auth/signup"}
            className="text-blue-500 transition-all hover:underline"
          >
            Sign up
          </Link>
        </p>
        <div className="flex items-center w-11/12 justify-between my-3">
          <hr className="w-36" />
          <span className="text-center text-slate-500">or</span>
          <hr className="w-36" />
        </div>
        <button
          className="btn-form mt-3"
          type="button"
          onClick={signInWIthGoogle}
        >
          <i className=" me-3 fa-brands fa-google"></i>
          Login with Google
        </button>
      </form>
    </>
  );
};

export default Signin;
