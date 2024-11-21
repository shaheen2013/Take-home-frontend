"use client";

import Image from "next/image";

interface TaskCardProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onClick: () => void;
}

export default function TaskCard({
  id,
  title,
  completed,
  onToggle,
  onDelete,
  onClick,
}: TaskCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-[#2C2C2C] rounded-lg p-4 flex items-center gap-3 group hover:bg-[#363636] transition-colors"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-5 h-5 rounded-full flex items-center justify-center border-2 
          ${
            completed
              ? "bg-[#8B6DFF] border-[#8B6DFF]"
              : "border-[#3B9EFF] hover:bg-[#3B9EFF]/10"
          }`}
      >
        {completed && (
          <svg
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6667 1L4.33333 7.33333L1 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <span
        className={`flex-1 ${
          completed ? "text-[rgba(255,255,255,0.6)] line-through" : "text-white"
        }`}
      >
        {title}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (window.confirm("Are you sure you want to delete this task?")) {
            onDelete();
          }
        }}
        className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
      >
        {/* <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.20214 4.98547H6.87158M6.87158 4.98547H5.54102M6.87158 4.98547V13.5M11.5286 4.98547H10.8633C10.8633 4.98547 10.3306 11.4897 10.198 13.0431C10.1553 13.5852 9.77163 13.9433 9.27003 13.9727C7.96657 14.0441 6.65846 14.0441 5.355 13.9727C4.8534 13.9433 4.46973 13.5852 4.42704 13.0431C4.29439 11.4897 3.76172 4.98547 3.76172 4.98547H3.09635M8.20214 4.98547V3.32365C8.20214 2.85581 7.83897 2.47461 7.39686 2.47461H6.34631C5.90419 2.47461 5.54102 2.85581 5.54102 3.32365V4.98547M12.194 2.47461H1.54395"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}

        <Image src="/trash.svg" alt="Rocket" width={26} height={26} />
      </button>
    </div>
  );
}
