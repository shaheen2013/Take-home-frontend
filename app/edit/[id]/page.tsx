import Header from "../../components/Header";
import TaskForm from "../../components/TaskForm";

async function getTask(id: string) {
  const res = await fetch(`http://localhost:3001/tasks/${id}`);
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}

export default async function EditTask({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);

  return (
    <main className="min-h-screen bg-[#1A1A1A] py-12">
      <div className="max-w-[800px] mx-auto px-4"></div>
      {/* Header */}
      <Header />
      <div className="max-w-4xl mx-auto p-6 pt-6">
        <TaskForm
          taskId={parseInt(params.id)}
          initialData={{
            title: task.title,
            color: task.color,
          }}
        />
      </div>
    </main>
  );
}
