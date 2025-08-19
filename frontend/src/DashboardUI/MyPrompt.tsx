// src/pages/MyPrompts.tsx
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CategoryDropDown from "../componenet/CategoryDropDown";
import PromptCard from "../componenet/PromptCard";
import PromptModal from "../componenet/PromptModal";
import Pagination from "../componenet/Pagination";
import { Prompt } from "../types/Prompt";
import { Loader } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const MyPrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [scope, setScope] = useState<"personal" | "community">("personal");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const {textTheme} = useTheme();
  const tagColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-red-100 text-red-700",
  ];

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts`, {
        params: { scope, limit, page, category },
        withCredentials: true,
      });
      setPrompts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching prompts", err);
    } finally {
      setLoading(false);
    }
  }, [scope, limit, page, category]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts/delete/${id}`, {
        withCredentials: true,
      });
      setPrompts((prev) => prev.filter((prompt) => prompt._id !== id));
    } catch (err) {
      console.error("Error deleting prompt", err);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return (
    <div className="p-4 bg-gray-50 h-screen">
      {/* Filters */}
      <div className="bg-white shadow-md p-3 mb-4">
        <h2 className={`text-lg font-semibold ${textTheme} mb-3`}>Filters</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-3">
          <CategoryDropDown
            value={scope}
            onChange={(val: "personal" | "community") => setScope(val)}
            options={[
              { label: "My Prompts", value: "personal" },
              { label: "Community", value: "community" },
            ]}
            placeholder="Select Scope"
          />
          <CategoryDropDown
            value={category}
            onChange={(val) => setCategory(val)}
            options={[
              { label: "All Categories", value: "" },
              { label: "Marketing", value: "Marketing" },
              { label: "Coding", value: "Coding" },
              { label: "Email", value: "Email" },
              { label: "Education", value: "Education" },
              { label: "Social Media", value: "Social Media" },
              { label: "Design", value: "Design" },
              { label: "Personal", value: "Personal" },
              { label: "Business", value: "Business" },
              { label: "Medical", value: "Medical" },
              { label: "Others", value: "Other" },
            ]}
            placeholder="Select Category"
          />
          <CategoryDropDown
            value={limit}
            onChange={(val) => setLimit(val)}
            options={[2, 3, 4, 5, 6].map((num) => ({
              label: `${num} per page`,
              value: num,
            }))}
            placeholder="Select limit"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Loader className="animate-spin text-[#432DD7]" size={24} />
          
        </div>
      ) : prompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <p className="text-red-500 text-sm">No prompts found.</p>

        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              tagColors={tagColors}
              onClick={() => setSelectedPrompt(prompt)}
              onDelete={() => handleDelete(prompt._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* Modal */}
      <PromptModal
        prompt={selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        tagColors={tagColors}
      />
    </div>
  );
};

export default MyPrompts;