import React from "react";
import { useQuery } from "react-query";
import SingleQuiz from "./SingleQuiz";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { axiosPrivate } from "../../Api/axiosPrivate";

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

  if (isLoading || error) return;
  return (
    <>
      <div className="mb-4">
        <Outlet />
        {quizzes.length === 0 && (
          <p className="text-center text-2xl text-gray-300">empty</p>
        )}
      </div>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <SingleQuiz key={quiz._id} quiz={quiz} refetch={refetch} />
        ))}
      </div>
    </>
  );
};

export default Quiz;
