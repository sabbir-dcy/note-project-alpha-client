import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

const LabDetails = () => {
  const { _id } = useParams();
  const [lab, setLab] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios(`http://localhost:5000/lab/${_id}`).then((res) =>
    setLab(res.data)
    );
  }, [_id]);
  return (
    <div className="bg-gray2 p-8 relative">
      <div className="border-b text-center p-3">
        <h2>Lab {lab.assignmentNumber}</h2>
      </div>
      <div className="space-y-2">
        <p>course : {lab.course}</p>
        <p>quizday : {lab.deadline}</p>
        <p>topic : {lab.topic}</p>
        <p>details : {lab.details}</p>
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

export default LabDetails;
