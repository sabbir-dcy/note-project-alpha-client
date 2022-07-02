import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  return (
    <div className="h-[80vh] text-center">
      <h2 className="mt-40 mb-20 text-2xl font-medium">Sleet Note</h2>
      <button onClick={() => signInWithGoogle()}>
        <div className="flex space-x-4 items-center bg-blue-50 shadow-md p-2 rounded-md justify-center">
          <FcGoogle className="text-2xl" />
          <span>Sign in with goolge</span>
        </div>
      </button>
    </div>
  );
};

export default Login;
