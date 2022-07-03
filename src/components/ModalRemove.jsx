import React from "react";

import { AiFillCloseCircle } from "react-icons/ai";
const ModalRemove = ({ handleRemove, setModal }) => {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] h-screen w-full absolute top-0 left-0 grid justify-items-center items-center">
      <div className="bg-gray-50 rounded-xl shadow-md p-4 relative">
        <h2 className="mt-8 text-gray-500">do you want to remove this task?</h2>
        <button
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-5 py-1 rounded-md block mx-auto mt-4 transition-colors"
          onClick={handleRemove}
        >
          yes
        </button>
        <AiFillCloseCircle
          className="text-2xl absolute top-4 right-4 text-red-400 cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => setModal(false)}
        />
      </div>
    </div>
  );
};

export default ModalRemove;
