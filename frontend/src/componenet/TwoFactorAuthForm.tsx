import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TwoFactorAuthForm = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [enabled, setEnabled] = useState(false);

  // 🔹 Load initial 2FA status from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setEnabled(user?.twoFactorEnabled || false);
    } catch {
      setEnabled(false);
    }
  }, []);

  // 🔹 Save updated user status in localStorage
  const updateUserLocalStorage = (status: boolean) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, twoFactorEnabled: status })
    );
    setEnabled(status);
  };

  // Setup 2FA (get QR code)
  const setup2FA = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}settings/setup-2fa`,
        {},
        { withCredentials: true }
      );
      setQrCode(res.data.qrCode);
      toast.info("Scan the QR code with Google Authenticator");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error setting up 2FA");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Verify OTP to enable
  const verify2FA = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}settings/verify-2fa`,
        { token },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      updateUserLocalStorage(true);
      setQrCode(null);
      setToken("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Invalid OTP");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // Disable 2FA
  const disable2FA = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_ENDPOINT}settings/disable-2fa`,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      updateUserLocalStorage(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error disabling 2FA");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        🔐 Two-Factor Authentication
      </h2>

      {!enabled ? (
        <div>
          {!qrCode ? (
            <button
              onClick={setup2FA}
              className="bg-blue-600 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Enable 2FA
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-32 h-32 sm:w-40 sm:h-40 mb-4"
              />
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-2 py-2 mb-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={verify2FA}
                className="bg-green-600 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Verify & Enable
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="mb-3 text-green-600 text-sm sm:text-base">
            ✅ 2FA is currently enabled
          </p>
          <button
            onClick={disable2FA}
            className="bg-red-600 text-white text-sm sm:text-base px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Disable 2FA
          </button>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuthForm;