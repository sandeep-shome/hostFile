import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
import Loader from "./Loader";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_USER_URL}/get-data`, {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        setUserData(response.data);
        userContext.setUserData(response.data);
      })
      .catch(() => {
        setIsLoading(false);
        return;
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_AUTH_URL}/signout`, {
        withCredentials: true,
      })
      .then(() => {
        setIsLoading(false);
        navigate("/auth");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //NAVBAR ACTIVATION
  const [isActive, setIsActive] = useState(false);

  const isNavActive = () => {
    window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isNavActive);
    return () => {
      window.removeEventListener("scroll", isNavActive);
    };
  }, []);

  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    themeContext.isDarkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [themeContext.isDarkMode]);

  return (
    <>
      {isLoading && <Loader />}
      <nav
        className={`w-full px-4 sm:px-9 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-3 flex items-center justify-between border-b border-b-transparent fixed top-0 left-0 transition-all ${
          isActive && "active"
        } ${themeContext.isDarkMode && "dark"}`}
      >
        <Link
          to={"/"}
          className=" text-2xl text-blue-600 flex items-center gap-4"
        >
          <span className="teko">hostFile.io </span>
          <div className="py-2 md:py-[10px] px-4 rounded-[30px] bg-blue-300 flex items-center justify-center dark:bg-gray-400/10">
            <span className="text-sm sm:text-base text-white dark:text-gray-200">
              V 1.0.0 Beta
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <span
            className="material-symbols-outlined text-gray-500 cursor-pointer select-none transition-all dark:text-gray-400"
            onClick={() => {
              themeContext.toggleTheme();
            }}
          >
            {themeContext.isDarkMode ? "light_mode" : "dark_mode"}
          </span>
          {userData ? (
            <div className="flex items-center justify-cente gap-4">
              <p className="text-base text-gray-500 select-none dark:text-gray-400">
                {userData.name}
              </p>
              <span
                className="block mt-1 text-xl material-symbols-outlined text-gray-500 cursor-pointer select-none dark:text-gray-400"
                onClick={logout}
              >
                logout
              </span>
            </div>
          ) : (
            <Link to={"/auth"} className="btn-secondary">
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
