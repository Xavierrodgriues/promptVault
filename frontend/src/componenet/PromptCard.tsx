// src/components/PromptCard.tsx
import { Trash2 } from "lucide-react";
import { Prompt } from "../types/Prompt";
import { useTheme } from "../context/ThemeContext";

interface PromptCardProps {
  prompt: Prompt;
  onClick?: () => void;
  onDelete?: () => void;
  tagColors: string[];
}

export default function PromptCard({ prompt, onClick, onDelete, tagColors }: PromptCardProps) {
  const {textTheme} = useTheme();
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-3 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="flex justify-between items-start">
        <h3 className={`text-base font-bold ${textTheme}`}>{prompt.title}</h3>
        {onDelete && (
          <button
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 size={16} color="red" />
          </button>
        )}
      </div>
      <div className="mt-1 text-xs text-gray-500">
        {prompt.category} | {prompt.type}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {prompt.tags?.map((tag: string, i: number) => {
          const colorClass = tagColors[i % tagColors.length];
          return (
            <span
              key={i}
              className={`${colorClass} px-2 py-0.5 text-[10px] rounded-full`}
            >
              {tag}
            </span>
          );
        })}
      </div>

      <div className="mt-2 text-[10px] text-gray-400">
        By {prompt.ownerId?.username} •{" "}
        {new Date(prompt.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
