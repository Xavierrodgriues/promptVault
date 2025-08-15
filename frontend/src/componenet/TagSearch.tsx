import { useState, useEffect, useCallback } from "react";
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

const TagSearch = () => {
  const [tagText, setTagText] = useState("");
  const [debouncedTagText, setDebouncedTagText] = useState("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTagText(tagText);
      setPage(1); // reset to first page when search changes
    }, 500); // 500ms delay
    return () => {
      clearTimeout(handler);
    };
  }, [tagText]);

  const fetchPrompts = useCallback(async () => {
    if (!debouncedTagText.trim()) {
      setPrompts([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/prompts/tags",
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

  const tagColors = [
              "bg-blue-100 text-blue-700",
              "bg-green-100 text-green-700",
              "bg-yellow-100 text-yellow-700",
              "bg-purple-100 text-purple-700",
              "bg-pink-100 text-pink-700",
              "bg-red-100 text-red-700",
            ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-[#432DD7]">
          Search by Tag
        </h1>
      </div>

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

      {/* Results */}
      {loading ? (
        <p className="text-center text-[#432DD7] text-sm">Loading...</p>
      ) : prompts.length === 0 ? (
        <p className="text-center text-[#432DD7] text-sm">No prompts found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {prompts.map((prompt) => {
            
            return (
              <div
                key={prompt._id}
                onClick={() => setSelectedPrompt(prompt)}
                className="bg-white rounded-lg shadow-md p-3 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <h3 className="text-base font-bold text-[#432DD7]">
                  {prompt.title}
                </h3>
                <div className="mt-1 text-xs text-gray-500">
                  {prompt.category} | {prompt.type}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {prompt.tags?.map((tag, i) => {
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
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-yellow-400 text-indigo-900 font-semibold px-2 py-1 text-sm rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium text-sm">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-yellow-400 text-indigo-900 font-semibold px-2 py-1 text-sm rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedPrompt && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-3 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl max-h-[80vh] flex flex-col relative">
            <button
              onClick={() => setSelectedPrompt(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>

            <div className="p-4 overflow-y-auto">
              <h2 className="text-xl font-bold text-[#432DD7] mb-3">
                {selectedPrompt.title}
              </h2>

              <div className="mb-2 text-xs text-gray-600">
                {selectedPrompt.category} | {selectedPrompt.type}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedPrompt.tags?.map((tag, i) => {
                  const colorClass = tagColors[i % tagColors.length];
                  return (
                    <span
                      key={i}
                      className={`${colorClass} px-2 py-0.5 text-[10px] rounded-full`}
                    >
                      {tag}
                    </span>
                )})}
              </div>

              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                {selectedPrompt.promptText}
              </p>

              <div className="mt-4 text-[10px] text-gray-500">
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

export default TagSearch;