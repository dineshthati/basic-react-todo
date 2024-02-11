import React from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Cards = ({ data, refernce, onDelete }) => {
  const deleteTask = (id) => {
    onDelete(id);
  };
  return (
    <motion.div
      drag
      dragConstraints={refernce}
      whileDrag={{ scale: 1.2 }}
      dragElastic={0.2}
      className="card relative w-[200px] bg-zinc-900/90 h-[250px] rounded-[35px] p-7 text-zinc-400 overflow-hidden "
    >
      <FaRegFileAlt />
      <h6 className="mt-3">{data.Todo}</h6>
      <button
        onClick={() => deleteTask(data.id)}
        className={`footer w-full ${
          data.Intensity == "red" ? "bg-red-600" : "bg-green-600"
        } p-4 absolute bottom-0 left-0 flex items-center justify-center text-white`}
      >
        Done
      </button>
    </motion.div>
  );
};

export default Cards;
