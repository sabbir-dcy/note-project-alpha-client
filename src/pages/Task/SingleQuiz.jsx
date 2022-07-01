import React, { useState } from "react";
import axios from "axios";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { FaUndoAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalRemove from "../../components/ModalRemove";

const SingleQuiz = ({ quiz, refetch }) => {
  const navigate = useNavigate();
  const { course, topic, quizDay, resource, complete, _id } = quiz;
  const [modal, setModal] = useState(false);
  const handleRemove = () => {
    axios
      .delete(`http://localhost:5000/quiz/${_id}`, {
        data: {
          user: "62be09c02797fe70073495ac",
        },
      })
      .then((res) => {
        toast.success("quiz removed");
        refetch();
      });
  };
  const handleComplete = () => {
    let status = true;
    if (complete) status = false;
    axios
      .put(
        `http://localhost:5000/quiz`,
        {
          complete: status,
        },
        {
          params: {
            _id: _id,
          },
        }
      )
      .then((res) => {
        refetch();
      });
  };
  return (
    <>
      <div>
        {modal && (
          <ModalRemove handleRemove={handleRemove} setModal={setModal} />
        )}
      </div>
      <div
        onClick={() => navigate(`/dashboard/task/quiz/details/${_id}`)}
        className={`${
          complete && " text-gray-400 bg-gray0"
        } flex gap-2 justify-between bg-gray2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer`}
      >
        <p>{course}</p>
        <p>{quizDay}</p>
        <p>{topic}</p>

        <a href={resource} target="_blank" rel="noreferrer">
          <button
            className={`${
              complete ? "text-blue-200" : "text-blue-400"
            } transition-all`}
            onClick={(e) => e.stopPropagation()}
          >
            resource link
          </button>
        </a>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleComplete();
          }}
        >
          {complete ? (
            <FaUndoAlt className="text-xl text-blue-500 w-10" />
          ) : (
            <AiFillCheckCircle className="text-2xl text-green-500 w-10" />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setModal(true);
          }}
        >
          <AiFillDelete className="text-2xl text-red-400" />
        </button>
      </div>
    </>
  );
};

export default SingleQuiz;
