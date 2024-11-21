import Header from "../components/Header";
import TaskForm from "../components/TaskForm";

export default function CreateTask() {
  return (
    <main className="min-h-screen bg-[#1E1E1E] py-12">
      <div className="max-w-[800px] mx-auto px-4"></div>
      {/* Header */}
      <Header />
      <div className="max-w-4xl mx-auto p-6 pt-6">
        <TaskForm />
      </div>
    </main>
  );
}
