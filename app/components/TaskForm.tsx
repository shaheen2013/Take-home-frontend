"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TaskFormProps {
  taskId?: number;
  initialData?: {
    title: string;
    color: string;
  };
}

const COLORS = [
  { label: "Red", value: "#FF5252" },
  { label: "Orange", value: "#FF9500" },
  { label: "Yellow", value: "#FFCC00" },
  { label: "Green", value: "#34C759" },
  { label: "Blue", value: "#007AFF" },
  { label: "Indigo", value: "#5856D6" },
  { label: "Purple", value: "#AF52DE" },
  { label: "Pink", value: "#FF2D55" },
  { label: "Brown", value: "#A2845E" },
];

export default function TaskForm({ taskId, initialData }: TaskFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    color: initialData?.color || COLORS[0].value,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const url = taskId
        ? `http://localhost:3001/tasks/${taskId}`
        : "http://localhost:3001/tasks";

      const method = taskId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save task");

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Failed to save task");
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 mx-auto mt-16">
      <Image
        src="/arrow-left.svg"
        alt="Rocket"
        width={22}
        height={22}
        className="mb-12 cursor-pointer"
        onClick={() => router.back()}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-[#4EA8DE] mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Ex. Brush you teeth"
            className="w-full border-[#333333] bg-[#262626] rounded-lg py-4 placeholder:text-[#595959] text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#4EA8DE] mb-2">
            Color
          </label>
          <div className="flex gap-4 flex-wrap">
            {COLORS.map((colorOption) => (
              <label
                key={colorOption.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="color"
                  value={colorOption.value}
                  checked={formData.color === colorOption.value}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="hidden"
                />
                <div
                  className={`w-[52px] h-[52px] rounded-full border-2 ${
                    formData.color === colorOption.value
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: colorOption.value }}
                />
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex justify-center items-center gap-2 w-full bg-[#1E6F9F] text-white py-4 rounded-lg text-center mb-8 hover:bg-[#3B9EFF]/90 transition-colors relative z-20"
          >
            {taskId ? "Update Task" : "Create Task"}
            {/* plus icon */}
            <Image src="/plus.svg" alt="Rocket" width={16} height={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
