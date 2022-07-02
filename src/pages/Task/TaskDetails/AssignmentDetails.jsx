import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";

const AssignmentDetails = () => {
  const { _id } = useParams();
  const [assignment, setAssignment] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios(`http://localhost:5000/assignment/${_id}`).then((res) =>
      setAssignment(res.data)
    );
  }, [_id]);
  return (
    <div className="bg-gray2 p-8 relative">
      <div className="border-b text-center p-3">
        <h2>Assignment {assignment.assignmentNumber}</h2>
      </div>
      <div className="space-y-2">
        <p>course : {assignment.course}</p>
        <p>quizday : {assignment.deadline}</p>
        <p>topic : {assignment.topic}</p>
        <p>details : {assignment.details}</p>
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

export default AssignmentDetails;
