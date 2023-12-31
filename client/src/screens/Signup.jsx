import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import validator from "email-validator";
import { errorMessege, successMessege } from "../components/ToastMesseges";
import { signInWithPopup } from "firebase/auth";
import { authConfig, provider } from "../../firebase.config.js";
import Loader from "../components/Loader.jsx";

const Signup = () => {
  //NAVIGATION
  const navigate = useNavigate();

  //INPUT STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //VALIDATION FUNCTIONLITY STATES
  const [isPassword, setIsPassword] = useState(true);
  const [isactiveEmail, setisActiveEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isNameActive, setIsNameActive] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  //GOOGLE SIGNIN
  const handleGoogleSignin = () => {
    setIsLoading(true);
    signInWithPopup(authConfig, provider)
      .then((result) => {
        const user = result.user;
        axios
          .post(
            `${import.meta.env.VITE_AUTH_URL}/signup-google`,
            {
              name: user.displayName,
              email: user.email,
              isVerified: user.emailVerified,
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
          .catch(() => {
            errorMessege("google auth failed");
            setIsLoading(false);
          });
        console.log(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        setIsLoading(false);
        // ...
      });
  };

  //SIGN UP FUNCTION
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (password.length > 0 && isValidEmail && isValidName) {
      if (password.length >= 6) {
        setIsLoading(true);
        axios
          .post(
            `${import.meta.env.VITE_AUTH_URL}/signup`,
            { name, email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            successMessege("Profile created successfully");
            setTimeout(() => {
              navigate(`/auth`);
            }, 1500);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        errorMessege("Password must contain atleat 6 charecters");
      }
    } else {
      errorMessege("All fields are required!");
    }
  };

  //EMAIL VALIDATOR
  useEffect(() => {
    if (email.length > 0) {
      setisActiveEmail(true);
      if (validator.validate(email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    } else {
      setisActiveEmail(false);
      setIsValidEmail(false);
    }
  }, [email]);

  //VALIDATE NAME
  const validateName = () => {
    setIsNameLoading(true);
    axios
      .get(`${import.meta.env.VITE_AUTH_URL}/name/${name}`)
      .then(() => {
        setIsNameLoading(false);
        setIsValidName(true);
      })
      .catch(() => {
        setIsNameLoading(false);
        setIsValidName(false);
      });
  };

  useEffect(() => {
    if (name.length > 0) {
      setIsNameActive(true);
      validateName();
    } else {
      setIsNameActive(false);
    }
  }, [name]);

  useEffect(() => {
    setTimeout(() => {
      setIsGoogleReady(true);
    }, 1500);
  }, []);

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
        <h3 className="text-2xl font-semibold text-slate-600 mb-1">Signup</h3>
        <p className="text-slate-500 mb-5 text-center">
          Create your file hosting account for <br /> absolutely free
        </p>
        <div className="w-11/12 mx-auto h-11 relative">
          <input
            type="text"
            className={`w-full h-11 ps-2 pe-10 outline-none border-slate-400 border rounded ${
              isNameActive && !isValidName
                ? "focus:border-red-500 border-red-500"
                : "focus:border-blue-500"
            } `}
            placeholder="Create Username"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          {isNameLoading && (
            <div role="status" className="absolute top-3 right-2">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {isValidName && isNameActive && !isNameLoading && (
            <i className="fa-solid fa-check text-green-400 absolute top-4 right-2"></i>
          )}
        </div>
        {!isValidName && isNameActive && (
          <div className="w-11/12 mx-auto">
            <label
              htmlFor="username"
              className="text-red-500 mb-1 block text-base"
            >
              This user name has been already taken
            </label>
          </div>
        )}
        <div className="w-11/12 mx-auto h-11 mb-2 mt-2 relative">
          <input
            type="email"
            className={`w-full h-11 ps-2 pe-10 outline-none ${
              isactiveEmail && !isValidEmail
                ? "focus:border-red-500 border-red-500"
                : "focus:border-blue-500"
            }  border rounded border-slate-400`}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div role="status" className="absolute top-3 right-2">
            {isValidEmail && (
              <i className="fa-solid fa-check text-green-400"></i>
            )}
          </div>
        </div>
        <div className="w-11/12 mx-auto h-11 mb-2 relative">
          <input
            type={`${isPassword ? "password" : "text"}`}
            className="w-full h-11 ps-2 pe-10 outline-none border-slate-400 border rounded focus:border-blue-500"
            placeholder="Create Password"
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

        <button
          type="submit"
          className="btn-form mt-3 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
        <p className="mt-2 text-slate-600">
          Already have account?{" "}
          <Link
            to={"/auth"}
            className="text-blue-500 transition-all hover:underline"
          >
            Sign in
          </Link>
        </p>
        <div className="flex items-center w-11/12 justify-between my-3">
          <hr className="w-36" />
          <span className="text-center text-slate-500">or</span>
          <hr className="w-36" />
        </div>
        <button
          className="btn-form mt-3 select-none bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400"
          onClick={handleGoogleSignin}
          type="button"
          disabled={!isGoogleReady ? true : false}
        >
          {isGoogleReady ? (
            <>
              <i className=" me-3 fa-brands fa-google"></i>
              Sign in with Google
            </>
          ) : (
            <div role="status" className="">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default Signup;
