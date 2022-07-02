import axios from "axios";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.init";
const useLogin = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (gUser) {
      navigate(from, { replace: true });
      axios
        .post("http://localhost:5000/user", {
          email: gUser?.user?.email,
        })
        .then((res) => {
          toast.success(res?.data?.message);
          localStorage.setItem("token", res?.data?.token);
        });
    }
  }, [gUser, from, navigate]);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return { handleSignIn };
};

export default useLogin;
