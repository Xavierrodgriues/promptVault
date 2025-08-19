const ChangeTheme = () => {
  const themes = [
    { id: 1, left: "bg-indigo-500", right: "bg-gray-100" },
    { id: 2, left: "bg-green-500", right: "bg-white" },
    { id: 3, left: "bg-red-500", right: "bg-gray-100" },
    { id: 4, left: "bg-purple-500", right: "bg-white" },
    { id: 5, left: "bg-blue-500", right: "bg-gray-200" },
    { id: 6, left: "bg-orange-500", right: "bg-white" }
  ];

  return (
    <div className="bg-white shadow-md w-full rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Change Theme</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => alert(`Theme ${theme.left} selected`)}
            className="relative w-40 h-28 rounded-xl overflow-hidden shadow-sm border border-gray-200
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