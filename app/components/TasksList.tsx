"use client";

import { useRouter } from "next/navigation";
import TaskCard from "./TaskCard";
import Image from "next/image";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  color: string;
}

interface TasksListProps {
  tasks: Task[];
}

export default function TasksList({ tasks }: TasksListProps) {
  const router = useRouter();

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center">
          <Image
            src="/Clipboard.svg"
            alt="Rocket"
            width={56}
            height={56}
            priority
          />
          <div className="text-center pt-8 pb-6 font-bold text-[rgba(255,255,255,0.6)]">
            You don't have any tasks registered yet.
          </div>

          <div className="text-center text-[rgba(255,255,255,0.6)]">
            Create tasks and organize your to-do items.
          </div>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onToggle={() => handleToggle(task.id, task.completed)}
            onDelete={() => handleDelete(task.id)}
            onClick={() => router.push(`/edit/${task.id}`)}
          />
        ))
      )}
    </div>
  );
}
