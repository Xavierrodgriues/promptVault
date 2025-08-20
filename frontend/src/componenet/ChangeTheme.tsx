import { useTheme } from "../context/ThemeContext";

const ChangeTheme = () => {

  const { setSidebarTheme, setBodyTheme, setActiveTheme, setLogoutTheme, setHoverTheme, setTextTheme } = useTheme();

  const themes = [
  { id: 1, left: "bg-indigo-900", right: "bg-zinc-100", activeTheme: "bg-indigo-700", logoutTheme: "bg-indigo-800", hoverTheme: "hover:bg-indigo-700", textTheme: "text-indigo-600" }, 
  { id: 2, left: "bg-teal-900", right: "bg-gray-50", activeTheme: "bg-teal-700", logoutTheme: "bg-teal-800", hoverTheme: "hover:bg-teal-700", textTheme: "text-teal-600" },
  { id: 3, left: "bg-amber-900", right: "bg-zinc-100", activeTheme: "bg-amber-700", logoutTheme: "bg-amber-800", hoverTheme: "hover:bg-amber-700", textTheme: "text-amber-600" },
  { id: 4, left: "bg-slate-900", right: "bg-zinc-100", activeTheme: "bg-slate-700", logoutTheme: "bg-slate-800", hoverTheme: "hover:bg-slate-700", textTheme: "text-slate-600" },
  { id: 5, left: "bg-black", right: "bg-zinc-100", activeTheme: "bg-gray-800", logoutTheme: "bg-gray-900", hoverTheme: "hover:bg-black-700", textTheme: "text-zinc-600" },
  { id: 6, left: "bg-emerald-900", right: "bg-gray-100", activeTheme: "bg-emerald-700", logoutTheme: "bg-emerald-800", hoverTheme: "hover:bg-emerald-700", textTheme: "text-gray-600" },
];


  return (
    <div className="bg-white shadow-md w-full rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Change Theme</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => {
              setSidebarTheme(theme.left);
              setBodyTheme(theme.right);
              setActiveTheme(theme.activeTheme);
              setLogoutTheme(theme.logoutTheme);
              setHoverTheme(theme.hoverTheme);
              setTextTheme(theme.textTheme);
            }}
            className="relative w-30 h-28 md:w-20 md:h-18 lg:w-30 lg:h-18 rounded-xl overflow-hidden shadow-sm border border-gray-200
                       hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500
                       transition transform duration-200"
          >
            {/* Left diagonal */}
            <div className={`absolute inset-0 ${theme.left} clip-left`} />

            {/* Right diagonal */}
            <div className={`absolute inset-0 ${theme.right} clip-right`} />

            {/* Labels */}
            <span className="absolute top-2 left-2 text-xs font-medium bg-white/80 text-gray-700 rounded-full px-2 py-0.5 shadow-sm">
              Sidebar
            </span>
            <span className="absolute bottom-2 right-2 text-xs font-medium bg-white/80 text-gray-700 rounded-full px-2 py-0.5 shadow-sm">
              Body
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChangeTheme;