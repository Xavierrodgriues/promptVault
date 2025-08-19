import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar
} from "recharts";
import { Calendar, BarChart3, PieChart as PieIcon, TrendingUp } from "lucide-react";

const Reports = () => {
  // Local state for stats
  const [totalPrompts, setTotalPrompts] = useState<number>(0);
  const [totalPersonalPrompt, setTotalPersonalPrompt] = useState<number>(0);
  const [totalCommunityPrompt, setTotalCommunityPrompt] = useState<number>(0);
  const [ratio_community, setRationCommunity] = useState<number>(0);
  const [ratio_personal, setRatioPersonal] = useState<number>(0);

  // Example static data (replace later with backend aggregation APIs)
  // const [data] = useState([
  //   { month: "Jan", prompts: 24, tags: 12, personal: 15, community: 9 },
  //   { month: "Feb", prompts: 18, tags: 14, personal: 10, community: 8 },
  //   { month: "Mar", prompts: 32, tags: 20, personal: 20, community: 12 },
  //   { month: "Apr", prompts: 27, tags: 25, personal: 15, community: 12 },
  //   { month: "May", prompts: 40, tags: 30, personal: 25, community: 15 },
  //   { month: "Jun", prompts: 35, tags: 28, personal: 18, community: 17 },
  //   { month: "Jul", prompts: 50, tags: 40, personal: 30, community: 20 },
  // ]);
  const [data, setData] = useState<{ month: string; personal: number; community: number }[]>([]);
  const [trendData, setTrendData] = useState<{ month: string; prompts: number; tags: number }[]>([]);


  useEffect(() => {
    const fetchTotalPrompts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts/count`, {
          withCredentials: true,
        });
        setTotalPrompts(res.data.total);
      } catch (err) {
        console.error("Error fetching total prompts:", err);
      }
    };

    const fetchTotalCommunity = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}community-prompt`, {
          withCredentials: true,
        });

        setTotalCommunityPrompt(res.data.count);

      } catch (err) {
        console.error("Error fetching total community prompts:", err);
      }
    };

    const fetchTotalPersonal = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}personal-prompt`, {
          withCredentials: true,
        });

        setTotalPersonalPrompt(res.data.count);

      } catch (err) {
        console.error("Error fetching total personal prompts:", err);
      }
    };

    const fetchRatio = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}getRatio`, {
        withCredentials: true
      });

      setRatioPersonal(res.data.ratio_personal);
      setRationCommunity(res.data.ratio_community);


    };

    const fetchMonthlyStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts/stats/6months`, {
          withCredentials: true,
        });
        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching monthly stats:", err);
      }
    };

    const fetchMonthlyTrends = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_ENDPOINT}prompts/trends/6months`, {
          withCredentials: true,
        });
        setTrendData(res.data.data);
      } catch (err) {
        console.error("Error fetching monthly trends:", err);
      }
    };



    fetchTotalPrompts();
    fetchTotalPersonal();
    fetchTotalCommunity();
    fetchRatio();
    fetchMonthlyStats();
    fetchMonthlyTrends();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Trends</h1>
          <p className="text-gray-600">Visual insights for your prompts and activity</p>
        </div>

        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-md border text-sm text-gray-700">
          <Calendar className="w-4 h-4" />
          Last 6 Months
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col items-start hover:shadow-lg transition">
          <TrendingUp className="text-blue-500 w-6 h-6 mb-2" />
          <h3 className="text-gray-600 text-sm">Total Prompts</h3>
          <p className="text-2xl font-bold text-gray-800">{totalPrompts}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col items-start hover:shadow-lg transition">
          <BarChart3 className="text-green-500 w-6 h-6 mb-2" />
          <h3 className="text-gray-600 text-sm">Total Personal</h3>
          <p className="text-2xl font-bold text-gray-800">{totalPersonalPrompt}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col items-start hover:shadow-lg transition">
          <PieIcon className="text-yellow-500 w-6 h-6 mb-2" />
          <h3 className="text-gray-600 text-sm">Total Community</h3>
          <p className="text-2xl font-bold text-gray-800">{totalCommunityPrompt}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col items-start hover:shadow-lg transition">
          <TrendingUp className="text-purple-500 w-6 h-6 mb-2" />
          <h3 className="text-gray-600 text-sm">Community vs Personal</h3>
          <p className="text-2xl font-bold text-gray-800">{`${ratio_community} / ${ratio_personal}`}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Monthly Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
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
  <Line type="monotone" dataKey="prompts" stroke="#3B82F6" strokeWidth={3} />
  <Line type="monotone" dataKey="tags" stroke="#10B981" strokeWidth={3} />
</LineChart>

            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Personal vs Community</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="personal" fill="#6366F1" />
                <Bar dataKey="community" fill="#F59E0B" />
              </BarChart>

            </ResponsiveContainer>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Reports;