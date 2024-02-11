import React, { useRef, useState, useEffect } from "react";
import Cards from "./Cards";
import { FaToilet } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { BiSolidMessageAltEdit } from "react-icons/bi";

const Foreground = () => {
  const ref = useRef(null);
  const [formData, setFormData] = useState(getFormDataFromLocalStorage());
  const [todo, setTodo] = useState("");
  const [AddingTask, setAddingTask] = useState(false);
  const [checked, setChecked] = useState(false);

  function getFormDataFromLocalStorage() {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : [];
  }

  function updateLocalStorage(formData) {
    localStorage.setItem("formData", JSON.stringify(formData));
  }

  const handleSubmit = () => {
    setAddingTask(true);
    setTodo("");
  };

  const formSubmission = () => {
    const newTask = {
      Todo: todo,
      Intensity: checked ? "red" : "green",
      isCompleted: false,
      id: crypto.randomUUID(),
    };

    setFormData((prevData) => [...prevData, newTask]);

    updateLocalStorage([...formData, newTask]);

    setAddingTask(false);
  };

  const deleteTask = (id) => {
    setFormData((prevData) => prevData.filter((task) => id !== task.id));

    updateLocalStorage(formData.filter((task) => id !== task.id));
  };
  return (
    <div
      ref={ref}
      className="absolute top-0 left-0  w-full h-screen p-6 flex gap-6"
    >
      {AddingTask ? (
        <div className="absolute top-0 left-0 z-10  w-full h-screen p-2 md:p-6 flex items-center justify-center">
          <div className=" w-[95%] md:w-[60%] h-[70%] bg-zinc-900 p-5 gap-10 rounded-3xl flex flex-col items-center justify-center">
            <button
              className="bg-zinc-400  p-4 rounded-md w-[80%] md:w-[40%]"
              onClick={() => setAddingTask(!AddingTask)}
            >
              Close
            </button>
            <input
              type="text"
              value={todo}
              className="bg-zinc-700  p-4 rounded-md w-[80%] md:w-[40%]"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Type the task(❁´◡`❁)"
            />
            <div className="flex">
              <label
                htmlFor="red"
                className="text-zinc-200 text-2xl font-semibold"
              >
                High Priority
              </label>
              <input
                type="checkbox"
                checked={checked}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                onChange={(e) => setChecked(e.target.checked)}
              />
            </div>
            <p className="text-zinc-500 text-xl ">
              **High Priority==❤️Red Button**
            </p>
            <button
              onClick={formSubmission}
              className="bg-zinc-400  p-4 rounded-md w-[40%]"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen">
          <div className="absolute w-[90%] flex items-center justify-center top-4 text-zinc-500">
            <BiSolidMessageAltEdit />
            <h3
              className="text-zinc-500 underline underline-offset-8 text-center font-semibold text-2xl cursor-pointer"
              onClick={handleSubmit}
            >
              Add New Task
            </h3>
          </div>
          <div className="absolute w-[95%] flex items-center justify-center top-[60px] text-zinc-500">
            <p>Drag 'n' Play with Todo Cards</p>
          </div>
        </div>
      )}
      {formData.map((item) => (
        <Cards data={item} refernce={ref} key={item.id} onDelete={deleteTask} />
      ))}
    </div>
  );
};

export default Foreground;
