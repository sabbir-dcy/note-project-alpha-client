import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

const QuizDetails = () => {
  const { _id } = useParams();
  const [quiz, setQuiz] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios(`http://localhost:5000/quiz/${_id}`).then((res) => setQuiz(res.data));
  }, [_id]);
  return (
    <div className="bg-gray2 p-8 relative">
      <div className="border-b text-center p-3">
        <h2>Quiz {quiz.quizNumber}</h2>
      </div>
      <div className="space-y-2">
        <p>course : {quiz.course}</p>
        <p>quizday : {quiz.quizDay}</p>
        <p>topic : {quiz.topic}</p>
        <p>details : {quiz.details}</p>
        <p>resource</p>
      </div>
      <div>
        <AiFillCloseCircle
          className="text-2xl text-red-400 absolute top-4 right-4 cursor-pointer"
          onClick={() => navigate("/dashboard/task/quiz")}
        />
      </div>
    </div>
  );
};

export default QuizDetails;
