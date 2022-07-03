import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { axiosPrivate } from "../../Api/axiosPrivate";
import Spinner from "../../components/Spinner";
import SingleTask from "../../components/SingleTask";
import { motion } from "framer-motion";

const Quiz = () => {
  const [user] = useAuthState(auth);
  const {
    isLoading,
    error,
    data: quizzes,
    refetch,
  } = useQuery(["quizzes", user], () =>
    axiosPrivate(`/quiz`, {
      params: {
        user: user?.email,
      },
    }).then((res) => {
      return res.data;
    })
  );

  if (isLoading || error) return <Spinner />;
  return (
    <>
      <div className="mb-4">
        <Outlet />
        {quizzes.length === 0 && (
          <p className="text-center text-2xl text-gray-300">empty</p>
        )}
      </div>
      <div className="space-y-4">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <SingleTask task={quiz} refetch={refetch} category="quiz" />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Quiz;
