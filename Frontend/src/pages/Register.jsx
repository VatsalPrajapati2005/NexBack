import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

export default function OTPLogin() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const redirect = useNavigate()

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(`${API}/register`, { mobile });
      if (res.data.success) {
        setStep(2);
        setError("");
        alert("OTP sent...! (check terminal for dev mode)");
      }
      console.log(res);
      
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API}/verify-otp`, { mobile, otp });
      if (res.data.success) {
  setToken(res.data.token);
  localStorage.setItem("token", res.data.token); // ✅ Save token here
  setError("");
  alert("Login successful...😊");
  redirect('/home')
}
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700"> Mobile OTP Login</h1>

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input type="text" placeholder="Enter Mobile Number"  value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"/>
            <button onClick={handleSendOtp} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl w-full transition duration-200"> Send OTP </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1"> OTP </label>
            <input type="text" placeholder="Enter OTP"  value={otp}  onChange={(e) => setOtp(e.target.value)}  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 mb-4" />
            <button onClick={handleVerifyOtp} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl w-full transition duration-200"> Verify OTP </button>
          </>
        )}

        {error && (
          <p className="text-red-600 text-center mt-4 text-sm font-medium">
            {error}
          </p>
        )}

        {token && (
          <div className="mt-6 text-center">
            <p className="text-green-700 font-semibold text-sm">JWT Token:</p>
            <textarea readOnly className="w-full text-xs bg-gray-100 border border-gray-300 rounded-xl p-3 mt-2 text-gray-800"  value={token}  rows={5}  />
          </div>
        )}
      </div>
    </div>
  );
}
