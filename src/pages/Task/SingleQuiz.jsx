import React, { useState } from "react";

import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { FaUndoAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalRemove from "../../components/ModalRemove";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.init";
import { axiosPrivate } from "../../Api/axiosPrivate";
import Spinner from "../../components/Spinner";

const SingleQuiz = ({ quiz, refetch }) => {
  const navigate = useNavigate();
  const { course, topic, quizDay, resource, complete, _id } = quiz;
  const [modal, setModal] = useState(false);
  const [user] = useAuthState(auth);
  const [spinning, setSpinning] = useState(false);
  const handleRemove = () => {
    setSpinning(true);
    axiosPrivate
      .delete(`/quiz/${_id}`, {
        data: {
          user: user?.email,
        },
      })
      .then((res) => {
        toast.success("quiz removed");
        setModal(false);
        setSpinning(false);
        refetch();
      });
  };
  const handleComplete = () => {
    let status = true;
    if (complete) status = false;
    axiosPrivate
      .put(
        `/quiz`,
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
  if (spinning) return <Spinner />;
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
        } flex gap-2 justify-between bg-gray2 px-8 py-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer`}
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
