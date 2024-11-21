import Link from "next/link";
import Image from "next/image";
import TasksList from "./components/TasksList";
import Header from "./components/Header";

async function getTasks() {
  const res = await fetch("http://localhost:3001/tasks", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export default async function Home() {
  const tasks = await getTasks();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task: any) => task.completed).length;

  return (
    <main className="min-h-screen bg-[#1E1E1E] py-12">
      <div className="max-w-[800px] mx-auto px-4">
        {/* Header */}
        <Header />

        {/* Create Task Button */}
        <Link
          href="/create"
          className="flex justify-center items-center gap-2 w-full bg-[#1E6F9F] text-white py-4 rounded-lg text-center mb-8 hover:bg-[#3B9EFF]/90 transition-colors relative z-20"
        >
          Create Task
          {/* plus icon */}
          <Image src="/plus.svg" alt="Rocket" width={16} height={16} />
        </Link>

        {/* Task Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#4EA8DE]">Tasks</span>
            <span className="bg-[#333333] px-2 py-1 rounded-xl text-sm text-white">
              {totalTasks}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#8284FA]">Completed</span>
            <span className="bg-[#333333] px-2 py-1 rounded-xl text-sm text-white">
              {completedTasks == 0 ? "0" : `${completedTasks} of ${totalTasks}`}
            </span>
          </div>
        </div>

        {/* Task List */}
        <TasksList tasks={tasks} />
      </div>
    </main>
  );
}
