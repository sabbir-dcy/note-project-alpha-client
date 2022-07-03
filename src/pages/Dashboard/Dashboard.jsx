import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { signOut } from "firebase/auth";
const Dashboard = () => {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState();
  const [user] = useAuthState(auth);
  return (
    <div className="lg:flex select-none">
      <div className="lg:flex hidden flex-col h-screen bg-gray1 w-80 items-center justify-center gap-4 relative">
        <Link
          className={`${
            pathname.includes("task") && "bg-orange-100"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/task/quiz"
        >
          See task
        </Link>
        <Link
          className={`${
            pathname.includes("addTask") && "bg-orange-100"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/addTask/quiz"
        >
          Add task
        </Link>
        <div className="absolute bottom-0  text-center w-full bg-orange-100 text-orange-700">
          {user ? (
            <button
              className="w-full p-3"
              onClick={() => signOut(auth)}
            >
              <FiLogOut className="mx-auto" />
            </button>
          ) : (
            <Link
              className={`px-3 rounded-2xl py-1 w-full block`}
              to="/dashboard/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="mx-4 my-6 px-4 lg:hidden sticky top-0">
        <AiOutlineMenu
          className="cursor-pointer text-2xl"
          onClick={() => setMenu(!menu)}
        />
        <div
          className={`${
            !menu && "hidden"
          }  flex flex-col shadow-md rounded-2xl p-6 bg-orange-50 absolute space-y-2 text-center`}
        >
          <Link
            className={`${
              pathname.includes("task") && "bg-orange-100"
            } px-3 rounded-2xl py-1`}
            to="/dashboard/task/quiz"
          >
            See task
          </Link>
          <Link
            className={`${
              pathname.includes("addTask") && "bg-orange-100"
            } px-3 rounded-2xl py-1`}
            to="/dashboard/addTask/quiz"
          >
            Add task
          </Link>
          {user ? (
            <button className="p-2" onClick={() => signOut(auth)}>
              <FiLogOut className="mx-auto" />
            </button>
          ) : (
            <Link
              className={`${
                pathname.includes("login") && "bg-orange-100"
              } px-3 rounded-2xl py-1`}
              to="/dashboard/login"
            >
              login
            </Link>
          )}
        </div>
      </div>

      <div
        className="lg:w-2/5 lg:ml-[15%] md:w-4/5 px-4 mx-auto lg:mt-20"
        onClick={() => setMenu(false)}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
