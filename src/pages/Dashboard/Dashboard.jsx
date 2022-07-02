import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

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
      <div className="lg:flex hidden flex-col h-screen bg-gray1 w-80 items-center justify-center gap-4">
        <Link
          className={`${
            pathname.includes("task") && "bg-red-100"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/task/quiz"
        >
          See task
        </Link>
        <Link
          className={`${
            pathname.includes("addTask") && "bg-red-100"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/addTask"
        >
          Add task
        </Link>
        <Link
          className={`${
            pathname.includes("login") && "bg-red-100"
          } px-3 rounded-2xl py-1`}
          to="/dashboard/login"
        >
          Add task
        </Link>
      </div>
      <div className="my-4 px-4 lg:hidden relative">
        <AiOutlineMenu
          className="cursor-pointer text-xl"
          onClick={() => setMenu(!menu)}
        />
        <div
          className={`${
            !menu && "hidden"
          }  flex flex-col shadow-md rounded-2xl p-6 bg-orange-50 absolute`}
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
            to="/dashboard/addTask"
          >
            Add task
          </Link>
          {user ? (
            <button onClick={() => signOut(auth)}>logout</button>
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
        className="lg:w-2/5 lg:ml-[15%] md:w-4/5 px-4 mx-auto "
        onClick={() => setMenu(false)}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
