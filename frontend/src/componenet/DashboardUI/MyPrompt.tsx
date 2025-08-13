// src/pages/MyPrompts.tsx
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CategoryDropDown from "../CategoryDropDown";
import { Trash2, } from "lucide-react";

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
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/prompts", {
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

    if (!window.confirm("Are you sure you want to delete this prompt?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/prompts/delete/${id}`, {
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
    // <div className="p-6 bg-gray-50 min-h-screen">
    //   {/* Filters */}
    //   {/* Filters */}
    //   <div className="bg-white shadow-md rounded-lg p-5 mb-6">
    //     <h2 className="text-xl font-semibold text-[#432DD7] mb-4">Filters</h2>
    //     <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
    //       {/* Scope Dropdown */}
    //       <CategoryDropDown
    //         value={scope}
    //         onChange={(val: "personal" | "community") => setScope(val)}
    //         options={[
    //           { label: "My Prompts", value: "personal" },
    //           { label: "Community", value: "community" },
    //         ]}
    //         placeholder="Select Scope"
    //       />

    //       {/* Category as rounded dropdown */}
    //       <CategoryDropDown
    //         value={category}
    //         onChange={(val) => setCategory(val)}
    //         options={[
    //           { label: "All Categories", value: "" },
    //           { label: "Marketing", value: "Marketing" },
    //           { label: "Coding", value: "Coding" },
    //           { label: "Email", value: "Email" },
    //           { label: "Education", value: "Education" },
    //           { label: "Social Media", value: "Social Media" },
    //           { label: "Design", value: "Design" },
    //           { label: "Personal", value: "Personal" },
    //           { label: "Business", value: "Business" },
    //           { label: "Medical", value: "Medical" },
    //           { label: "Others", value: "Other" },
    //         ]}
    //         placeholder="Select Category"
    //       />

    //       {/* Limit */}
    //       <CategoryDropDown
    //         value={limit}
    //         onChange={(val) => setLimit(val)}
    //         options={[2, 3, 4, 5, 6].map((num) => ({
    //           label: `${num} per page`,
    //           value: num,
    //         }))}
    //         placeholder="Select limit"
    //       />
    //     </div>
    //   </div>

    //   {/* Prompts */}
    //   {/* Prompts */}
    //   {loading ? (
    //     <p className="text-center text-[#432DD7]">Loading...</p>
    //   ) : prompts.length === 0 ? (
    //     <p className="text-center text-[#432DD7]">No prompts found.</p>
    //   ) : (
    //     <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
    //       {prompts.map((prompt) => {
    //         // Define some random tag colors
    //         const tagColors = [
    //           "bg-blue-100 text-blue-700",
    //           "bg-green-100 text-green-700",
    //           "bg-yellow-100 text-yellow-700",
    //           "bg-purple-100 text-purple-700",
    //           "bg-pink-100 text-pink-700",
    //           "bg-red-100 text-red-700",
    //         ];

    //         return (
    //           <div
    //             key={prompt._id}
    //             onClick={() => setSelectedPrompt(prompt)}
    //             className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 cursor-pointer hover:shadow-xl transition-all"
    //           >
    //             <h3 className="text-lg font-bold text-[#432DD7]">
    //               {prompt.title}
    //             </h3>
    //             <div className="mt-2 text-sm text-gray-500">
    //               {prompt.category} | {prompt.type}
    //             </div>

    //             {/* Tags */}
    //             <div className="flex flex-wrap gap-2 mt-3">
    //               {prompt.tags?.map((tag, i) => {
    //                 const colorClass = tagColors[i % tagColors.length];
    //                 return (
    //                   <span
    //                     key={i}
    //                     className={`${colorClass} px-3 py-1 text-xs rounded-full`}
    //                   >
    //                     {tag}
    //                   </span>
    //                 );
    //               })}
    //             </div>

    //             <div className="mt-4 text-xs text-gray-400">
    //               By {prompt.ownerId?.username} •{" "}
    //               {new Date(prompt.createdAt).toLocaleDateString()}
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}

    //   {/* Pagination */}
    //   <div className="flex justify-center items-center gap-3 mt-8">
    //     <button
    //       disabled={page === 1}
    //       onClick={() => setPage((p) => p - 1)}
    //       className="bg-yellow-400 text-indigo-900 font-semibold px-3 py-1 rounded-md"
    //     >
    //       Prev
    //     </button>
    //     <span className="text-gray-700 font-medium">
    //       {page} / {totalPages}
    //     </span>
    //     <button
    //       disabled={page === totalPages}
    //       onClick={() => setPage((p) => p + 1)}
    //       className="bg-yellow-400 text-indigo-900 font-semibold px-3 py-1 rounded-md"
    //     >
    //       Next
    //     </button>
    //   </div>

    //   {/* Modal */}
    //   {/* Modal */}
    //   {selectedPrompt && (
    //     <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 z-50">
    //       <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[80vh] flex flex-col relative">
    //         {/* Close button */}
    //         <button
    //           onClick={() => setSelectedPrompt(null)}
    //           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
    //         >
    //           ✕
    //         </button>

    //         {/* Scrollable content */}
    //         <div className="p-6 overflow-y-auto">
    //           <h2 className="text-2xl font-bold text-[#432DD7] mb-4">
    //             {selectedPrompt.title}
    //           </h2>

    //           <div className="mb-4 text-sm text-gray-600">
    //             {selectedPrompt.category} | {selectedPrompt.type}
    //           </div>

    //           {/* Tags */}
    //           <div className="flex flex-wrap gap-2 mb-4">
    //             {selectedPrompt.tags?.map((tag, i) => (
    //               <span
    //                 key={i}
    //                 className="bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded-full"
    //               >
    //                 {tag}
    //               </span>
    //             ))}
    //           </div>

    //           {/* Prompt text */}
    //           <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
    //             {selectedPrompt.promptText}
    //           </p>

    //           <div className="mt-6 text-xs text-gray-500">
    //             By {selectedPrompt.ownerId?.username} •{" "}
    //             {new Date(selectedPrompt.createdAt).toLocaleDateString()}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>

    <div className="p-4 bg-gray-50 h-screen">
      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-3 mb-4">
        <h2 className="text-lg font-semibold text-[#432DD7] mb-3">Filters</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-3">
          {/* Scope Dropdown */}
          <CategoryDropDown
            value={scope}
            onChange={(val: "personal" | "community") => setScope(val)}
            options={[
              { label: "My Prompts", value: "personal" },
              { label: "Community", value: "community" },
            ]}
            placeholder="Select Scope"
          />

          {/* Category */}
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

          {/* Limit */}
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

      {/* Prompts */}
      {loading ? (
        <p className="text-center text-[#432DD7] text-sm">Loading...</p>
      ) : prompts.length === 0 ? (
        <p className="text-center text-[#432DD7] text-sm">No prompts found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {prompts.map((prompt) => {
            const tagColors = [
              "bg-blue-100 text-blue-700",
              "bg-green-100 text-green-700",
              "bg-yellow-100 text-yellow-700",
              "bg-purple-100 text-purple-700",
              "bg-pink-100 text-pink-700",
              "bg-red-100 text-red-700",
            ];

            return (
              <div
                key={prompt._id}
                onClick={() => setSelectedPrompt(prompt)}
                className="bg-white rounded-lg shadow-md p-3 border border-gray-100 cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">

                  <h3 className="text-base font-bold text-[#432DD7]">
                    {prompt.title}
                  </h3>
                  <button className="cursor-pointer" onClick={(e) =>{ e.stopPropagation(); handleDelete(prompt._id)}}><Trash2 size={16} color="red"/></button>
                </div>

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
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-yellow-400 text-indigo-900 font-semibold px-2 py-1 text-sm rounded-md"
        >
          Prev
        </button>
        <span className="text-gray-700 font-medium text-sm">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="bg-yellow-400 text-indigo-900 font-semibold px-2 py-1 text-sm rounded-md"
        >
          Next
        </button>
      </div>

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
                {selectedPrompt.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-700 px-2 py-0.5 text-[10px] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
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

export default MyPrompts;
