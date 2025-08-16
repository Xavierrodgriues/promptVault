import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const categories = [
  "Marketing", "Social Media", "Coding", "Email",
  "Education", "Design", "Personal", "Business", "Other"
];
const types = ["personal", "community"];

export default function PromptEditor() {
  const [form, setForm] = useState({
    title: "",
    promptText: "",
    category: categories[0],
    type: types[0],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e:  ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/prompt/add", form, { withCredentials: true });
      toast.success("Prompt saved!");
      setForm({ title: "", promptText: "", category: categories[0], type: types[0] });
    } catch (err) {
      console.error(err);
      toast.error("Error saving prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Prompt Editor</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter prompt title"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Prompt Text */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Prompt Text</label>
          <textarea
            name="promptText"
            value={form.promptText}
            onChange={handleChange}
            placeholder="Write your prompt here..."
            rows={6}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold px-5 py-2 rounded-md shadow-sm transition"
        >
          {loading ? "Saving..." : "Save Prompt"}
        </button>
      </form>
    </div>
  );
}