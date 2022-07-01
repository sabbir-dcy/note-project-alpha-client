import React from "react";
import axios from "axios";

import { useQuery } from "react-query";
import SingleQuiz from "./SingleQuiz";
import { Outlet } from "react-router-dom";
const Quiz = () => {
  const {
    isLoading,
    error,
    data: quizzes,
    refetch,
  } = useQuery("quizzes", () =>
    axios(`http://localhost:5000/quiz`, {
      params: {
        user: "62be09c02797fe70073495ac",
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
