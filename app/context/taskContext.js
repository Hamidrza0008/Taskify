"use client"
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <TaskContext.Provider value={{ addTask, tasks }}>
      {children}
    </TaskContext.Provider>
  );
};