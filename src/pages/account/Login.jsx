import React from "react";

import { FcGoogle } from "react-icons/fc";
import useLogin from "../../hook/useLogin";

const Login = () => {
  const { handleSignIn } = useLogin();

  return (
    <div className="h-[80vh] text-center">
      <h2 className="mt-40 mb-20 text-2xl font-medium">Sleet Note</h2>
      <button onClick={handleSignIn}>
        <div className="flex space-x-2 items-center bg-orange-50 shadow-md px-4 py-2 rounded-md justify-center hover:bg-orange-100 transition-colors">
          <FcGoogle className="text-2xl" />
          <span>Sign in with goolge</span>
        </div>
      </button>
    </div>
  );
};

export default Login;
