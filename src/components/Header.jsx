import React, { useEffect, useState } from "react";
import avatar from "../assets/profile.png";
import { useNavigate } from "react-router";
import { profileUser } from "../api/service";

const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  let token = localStorage.getItem("token");
  const pageInit = () => {
    profileUser(token).then((req, res) => {
      if (req.data.status !== "failed") {
        setIsUserLoggedIn(true);
      } else {
      }
    });
  };
  useEffect(() => {
    pageInit();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row justify-between bg-bluePrimary w-full h-14">
        <div className="flex flex-col justify-center ml-6 text-white text-2xl font-bold">
          Feedback
        </div>
        <div className="mt-4 mr-16 flex-flex-row ml-6 text-white text-md font-semibold">
          {isUserLoggedIn ? (
            <>
              <span
                className="mr-4 cursor-pointer"
                onClick={() => navigate("/logout")}
              >
                Logout
              </span>
              <span>Hello!</span>
            </>
          ) : (
            <>
              <span
                className="sm:mr-6 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login
              </span>
              <span
                onClick={() => navigate("/register")}
                className="border cursor-pointer border-white px-4 py-1 rounded-lg"
              >
                Signup
              </span>
            </>
          )}
        </div>
      </div>
      {isUserLoggedIn && (
        <img
          src={avatar}
          alt={avatar}
          className="absolute top-1 right-2 h-10 w-10 inline rounded-full object-cover"
        />
      )}
    </>
  );
};

export default Header;
