import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar } from "lucide-react";

const Reports = () => {
  // Example chart data
  const [data] = useState([
    { month: "Jan", prompts: 24, tags: 12 },
    { month: "Feb", prompts: 18, tags: 14 },
    { month: "Mar", prompts: 32, tags: 20 },
    { month: "Apr", prompts: 27, tags: 25 },
    { month: "May", prompts: 40, tags: 30 },
    { month: "Jun", prompts: 35, tags: 28 },
    { month: "Jul", prompts: 50, tags: 40 },
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Trends</h1>
          <p className="text-gray-600">Visual insights for your prompts and tags</p>
        </div>

        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md border text-sm text-gray-700">
          <Calendar className="w-4 h-4" />
          Last 6 Months
        </button>
      </div>

      {/* Chart Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Trending Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="prompts"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="tags"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;