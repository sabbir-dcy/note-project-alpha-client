import React, { useState } from "react";
import { AiFillCheckCircle, AiFillDelete } from "react-icons/ai";
import { FaUndoAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ModalRemove from "./ModalRemove";
import { axiosPrivate } from "../Api/axiosPrivate";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.init";
import Spinner from "./Spinner";

const SingleTask = ({ task, refetch, category }) => {
  const navigate = useNavigate();
  const { course, topic, deadline, complete, _id } = task;
  const [modal, setModal] = useState(false);
  const [user] = useAuthState(auth);
  const [spinning, setSpinning] = useState(false);
  const handleRemove = () => {
    setSpinning(true);
    axiosPrivate
      .delete(`/${category}/${_id}`, {
        data: {
          user: user?.email,
        },
      })
      .then((res) => {
        toast.success(`${category} removed`);
        setModal(false);
        setSpinning(false);
        refetch();
      });
  };
  const handleComplete = () => {
    setSpinning(true);
    let status = true;
    if (complete) status = false;
    axiosPrivate
      .put(
        `/${category}`,
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
        setSpinning(false);
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
        onClick={() =>
          navigate(`/dashboard/task/${category}/details/${category}/${_id}`)
        }
        className={`${
          complete && " text-gray-400 bg-gray0"
        } grid grid-cols-4 md:grid-cols-5 justify-items-center text-center items-center gap-2 bg-gray2 p-2 rounded-md transition-all hover:bg-gray-100 cursor-pointer`}
      >
        <p>{course}</p>
        <p>{deadline}</p>
        <p className="hidden md:block">{topic}</p>

        <button
          className={`${
            complete ? "hover:bg-blue-100" : "hover:bg-green-200"
          } w-10 h-10 rounded-full flex justify-center items-center transition-colors`}
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
          className="hover:bg-red-100 w-10 h-10 rounded-full flex justify-center items-center transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setModal(true);
          }}
        >
          <AiFillDelete className="text-2xl text-red-400 " />
        </button>
      </div>
    </>
  );
};

export default SingleTask;
