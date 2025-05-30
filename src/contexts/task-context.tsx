
"use client";
import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  name: string;
}

interface TaskContextType {
  tasks: Task[];
  completedTasks: Task[];
  selectedTask: Task | null;
  addTask: (taskName: string) => void;
  deleteTask: (taskId: string) => void;
  markTaskAsComplete: (taskId: string) => void;
  spinWheel: () => void;
  isSpinning: boolean;
  clearSelectedTask: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('spinnerTasks');
      if (storedTasks) {
        try {
          setTasks(JSON.parse(storedTasks));
        } catch (e) {
          console.error("Failed to parse tasks from localStorage", e);
          localStorage.removeItem('spinnerTasks');
        }
      }
      const storedCompletedTasks = localStorage.getItem('spinnerCompletedTasks');
      if (storedCompletedTasks) {
         try {
          setCompletedTasks(JSON.parse(storedCompletedTasks));
        } catch (e) {
          console.error("Failed to parse completed tasks from localStorage", e);
          localStorage.removeItem('spinnerCompletedTasks');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('spinnerTasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('spinnerCompletedTasks', JSON.stringify(completedTasks));
    }
  }, [completedTasks, mounted]);

  const addTask = (taskName: string) => {
    if (taskName.trim() === '') return;
    const newTask: Task = { id: crypto.randomUUID(), name: taskName.trim() };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const markTaskAsComplete = (taskId: string) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setCompletedTasks((prevCompleted) => [taskToComplete, ...prevCompleted]);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      if (selectedTask?.id === taskId) {
        setSelectedTask(null);
      }
    }
  };

  const spinWheel = () => {
    if (tasks.length === 0 || isSpinning) return;
    setIsSpinning(true);
    setSelectedTask(null);

    const spinDuration = 3000 + Math.random() * 1000; // 3-4 seconds

    setTimeout(() => {
      if (tasks.length > 0) { // Check tasks again in case they were all completed during spin
        const randomIndex = Math.floor(Math.random() * tasks.length);
        setSelectedTask(tasks[randomIndex]);
      }
      setIsSpinning(false);
    }, spinDuration);
  };
  
  const clearSelectedTask = () => {
    setSelectedTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        completedTasks,
        selectedTask,
        addTask,
        deleteTask,
        markTaskAsComplete,
        spinWheel,
        isSpinning,
        clearSelectedTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
