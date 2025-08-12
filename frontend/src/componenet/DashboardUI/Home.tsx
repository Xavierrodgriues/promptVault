import { Mail, Phone, MessageSquare } from "lucide-react";
import Calendar from "../Calender";
import Clock from "../Clock";

const Home = () => {
  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl lg:text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white rounded-full shadow">
            <Mail size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow">
            <MessageSquare size={18} />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:block font-semibold">Mr Smith</span>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Card */}
          <div className="bg-indigo-600 text-white rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="max-w-md">
              <h2 className="text-lg font-semibold mb-2">Hello Mr Smith!</h2>
              <p className="mb-4 text-sm">
                Today you have 9 new applications. Also you need to hire ROR
                Developer, React.JS Developer.
              </p>
              <button className="bg-yellow-400 text-indigo-900 font-semibold px-4 py-2 rounded-md">
                Read more
              </button>
            </div>
            <div className="mt-4 md:mt-0">
              <Clock /> {/* Fancy clock here */}
            </div>
          </div>

          {/* Recruitment Progress */}
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Recruitment Progress</h3>
              <button className="text-indigo-600 font-medium">View All</button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Mary G. Schuelke",
                  role: "Project Manager",
                  roleColor: "bg-red-100 text-red-600",
                  status: "Tech Interview",
                  avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                },
                {
                  name: "Lawrence A. Mason",
                  role: "HR Developer",
                  roleColor: "bg-yellow-100 text-yellow-700",
                  status: "Task",
                  avatar: "https://randomuser.me/api/portraits/men/68.jpg",
                },
                {
                  name: "Jimmy C. Wilson",
                  role: "React JS Developer",
                  roleColor: "bg-indigo-100 text-indigo-700",
                  status: "Resume Review",
                  avatar: "https://randomuser.me/api/portraits/men/15.jpg",
                },
                {
                  name: "Vivian J. Joseph",
                  role: "Node JS Developer",
                  roleColor: "bg-green-100 text-green-700",
                  status: "Final Interview",
                  avatar: "https://randomuser.me/api/portraits/women/50.jpg",
                },
              ].map((person, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${person.roleColor}`}
                      >
                        {person.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{person.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <div className="bg-white p-4 rounded-lg shadow">
            <Calendar />
          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Mr Smith"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h4 className="font-semibold">Mr Smith</h4>
            <p className="text-sm text-gray-500">Sr. HR Manager</p>

            <div className="flex justify-center gap-3 my-4">
              <button className="p-2 bg-indigo-100 rounded-full">
                <Phone size={16} />
              </button>
              <button className="p-2 bg-indigo-100 rounded-full">
                <Mail size={16} />
              </button>
              <button className="p-2 bg-indigo-100 rounded-full">
                <MessageSquare size={16} />
              </button>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Company:</strong> FoxHr Pvt. Ltd.
              </p>
              <p>
                <strong>Joining Date:</strong> 01/08/2018
              </p>
              <p>
                <strong>Projects:</strong> 34 Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
