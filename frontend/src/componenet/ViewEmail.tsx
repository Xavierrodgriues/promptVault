


const ViewEmail = () => {


  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Your Email</h2>
      <form>
        <input
          type="text"
          value={JSON.parse(localStorage.getItem("user") || "{}").email || ""}
          disabled
          placeholder={JSON.parse(localStorage.getItem("user") || "{}").email || "No email found"}
          className="w-full border p-2 rounded-lg mb-4 focus:outline-none bg-gray-200 cursor-no-drop focus:ring-2 focus:ring-indigo-500"
          required
        />
        
      </form>
    </div>
  );
};

export default ViewEmail;