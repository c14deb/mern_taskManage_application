import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, getAllTasks, UpdateTaskById } from "./api";
import { notify } from "./utils";

const TaskManager = () => {
  const [input, setInput] = useState("");
  // console.log(input);
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = async () => {
    if (updateTask && input) {
      //update api call
      console.log("update api call");
      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      handleUpdateItem(obj);
    } else if (updateTask === null && input) {
      console.log("create api call");
      //create api call
      handleAddTask();
    }
    setInput(" ");
  };
  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
    }
  }, [updateTask]);

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    // console.log(obj);
    try {
      const { success, message } = await CreateTask(obj);
      // console.log(data);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "success");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await getAllTasks();
      // console.log(data);
      setCopyTasks(data);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("fialed to delete task", "error");
    }
  };

  const handleCheckAndUncheck = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("fialed to update task", "error");
    }
  };

  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        notify(message, "success");
      } else {
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.error(err);
      notify("fialed to update task", "error");
    }
  };

  const handleSearch = async (e) => {
    const searchitem = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((i) =>
      i.taskName.toLowerCase().includes(searchitem)
    );
    setTasks(results);
  };

  return (
    <div className="d-flex flex-column align-items-center m-auto mt-5 w-50">
      <h1 className="mb-4">Task Manager App</h1>

      {/* input and search box */}
      <div
        className="d-flex justify-content-between align-items-center
       mb-4 w-100"
      >
        <div className="input-group flex-grow-1 me-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="form-control me-1"
            placeholder="Add a new task"
          />
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            type="text"
            className="form-control"
            placeholder="search-tasks"
          />
        </div>
      </div>

      {/* list of items */}
      <div className="d-flex flex-column w-100">
        {tasks.map((item, index) => (
          <div
            className="m-2 p-2 border bg-light
              w-100 rounded-3 d-flex justify-content-between
              align-items-center"
            key={index}
          >
            <span className={item.isDone ? "text-decoration-line-through" : ""}>
              {item.taskName}
            </span>

            <div className="">
              <button className="btn btn-success btn-sm me-2" type="button">
                <FaCheck onClick={() => handleCheckAndUncheck(item)} />
              </button>
              <button
                onClick={() => setUpdateTask(item)}
                className="btn btn-primary btn-sm me-2"
                type="button"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDeleteTask(item._id)}
                className="btn btn-danger btn-sm me-2"
                type="button"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TaskManager;
