// src/pages/MyPrompts.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Prompt {
  _id: string;
  title: string;
  promptText: string;
  category: string;
  type: string;
  tags: string[];
  ownerId: {
    username: string;
    email: string;
  };
  createdAt: string;
}

const MyPrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [scope, setScope] = useState<"personal" | "community">("personal");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/prompts", {
        params: { scope, limit, page, category, type },
        withCredentials: true,
      });
      setPrompts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      console.error("Error fetching prompts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [scope, category, type, limit, page]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h2 className="text-xl font-semibold text-[#432DD7] mb-4">Filters</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value as any)}
            className="border rounded-lg p-2"
          >
            <option value="personal">My Prompts</option>
            <option value="community">Community</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg p-2"
          />
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
            className="border rounded-lg p-2"
          >
            {[2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompts */}
      {loading ? (
        <p className="text-center text-[#432DD7]">Loading...</p>
      ) : prompts.length === 0 ? (
        <p className="text-center text-[#432DD7]">No prompts found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {prompts.map((prompt) => (
            <div
              key={prompt._id}
              onClick={() => setSelectedPrompt(prompt)}
              className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-[#432DD7] cursor-pointer hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-[#432DD7]">
                {prompt.title}
              </h3>
              <div className="mt-3">
                <span className="text-sm font-semibold text-blue-600">
                  {prompt.category}
                </span>{" "}
                | <span className="text-sm text-yellow-600">{prompt.type}</span>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {prompt.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500">
                By {prompt.ownerId?.username} •{" "}
                {new Date(prompt.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-yellow-400 text-indigo-900 font-semibold px-3 py-1 rounded-md"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-yellow-400 text-indigo-900 font-semibold px-3 py-1 rounded-md"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {/* Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[80vh] flex flex-col relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedPrompt(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            {/* Scrollable content */}
            <div className="p-6 overflow-y-auto">
              <h2 className="text-2xl font-bold text-[#432DD7] mb-4">
                {selectedPrompt.title}
              </h2>

              <div className="mb-4 text-sm text-gray-600">
                {selectedPrompt.category} | {selectedPrompt.type}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPrompt.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Prompt text */}
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {selectedPrompt.promptText}
              </p>

              <div className="mt-6 text-xs text-gray-500">
                By {selectedPrompt.ownerId?.username} •{" "}
                {new Date(selectedPrompt.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPrompts;
