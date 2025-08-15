import { Prompt } from "../types/Prompt";

// src/components/PromptModal.tsx
interface PromptModalProps {
  prompt: Prompt|null;
  onClose: () => void;
  tagColors: string[];
}

export default function PromptModal({ prompt, onClose, tagColors }: PromptModalProps) {
  if (!prompt) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-3 z-50">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl max-h-[80vh] flex flex-col relative">
        
        <div className="p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-[#432DD7] mb-3">
              {prompt.title}
            </h2>
            <button
          onClick={onClose}
          className="cursor-pointer bg-red-500 px-1 rounded-md text-white hover:text-gray-600 text-xl"
        >
          ✕
        </button>

          </div>
          <div className="mb-2 text-xs text-gray-600">
            {prompt.category} | {prompt.type}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
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

          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
            {prompt.promptText}
          </p>

          <div className="mt-4 text-[10px] text-gray-500">
            By {prompt.ownerId?.username} •{" "}
            {new Date(prompt.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
