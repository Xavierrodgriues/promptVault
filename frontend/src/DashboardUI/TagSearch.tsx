// src/pages/TagSearch.tsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PromptCard from "../componenet/PromptCard";
import PromptModal from "../componenet/PromptModal";
import Pagination from "../componenet/Pagination";
import { Prompt } from "../types/Prompt"; 
import {Loader} from "lucide-react"

const TagSearch = () => {
  const [tagText, setTagText] = useState("");
  const [debouncedTagText, setDebouncedTagText] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const tagColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-red-100 text-red-700",
  ];

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTagText(tagText);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [tagText]);

  const fetchPrompts = useCallback(async () => {
    if (!debouncedTagText.trim()) {
      setPrompts([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}prompts/tags`,
        { tagText: debouncedTagText, page, limit: 6 },
        { withCredentials: true }
      );
      setPrompts(res.data.prompts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching prompts:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedTagText, page]);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return (
    <div className="p-4 bg-white  min-h-screen">
      <h1 className="text-xl lg:text-2xl font-bold mb-6">
        Search by Tag
      </h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6 bg-white p-3 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search by tag..."
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#432DD7]"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Loader className="animate-spin text-[#432DD7]" size={24} />
          
        </div>
      ) : prompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <img className="w-full h-full hidden md:block" src="../../public/Page_Not_Found_Illustration_high_resolution_preview_1649340.jpg" alt="" />
          <p className="text-red-500">No prompt found</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              tagColors={tagColors}
              onClick={() => setSelectedPrompt(prompt)}
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

export default TagSearch;