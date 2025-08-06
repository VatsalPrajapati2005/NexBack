import { useState } from "react";
import { Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LinkAccountPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleBankLink = async () => {
    if (!accountNumber || !ifscCode || !accountHolder) {
      toast.error("All bank fields are required");
      return;
    }
    if (ifscCode.length !== 11) {
      toast.error("IFSC Code must be 11 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/account/link-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountNumber, ifscCode, accountHolder }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Bank account linked successfully");
        setAccountNumber("");
        setIfscCode("");
        setAccountHolder("");
      } else {
        toast.error(data.message || "Bank linking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleUpiLink = async () => {
    if (!upiId) {
      toast.error("Please enter a valid UPI ID");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/account/link-upi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ upiId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("UPI ID linked successfully");
        setUpiId("");
      } else {
        toast.error(data.message || "UPI linking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="bg-white min-h-screen max-w-sm mx-auto shadow-md relative">
      <ToastContainer position="top-center" autoClose={2000} />
      
      <div className="p-4 border-b flex items-center">
        <button onClick={() => navigate(-1)} className="mr-2"></button>
        <h2 className="font-semibold text-lg">Link Your Account</h2>
      </div>

      <div className="p-4">
        {/* Bank Section */}
        <div className="border border-dashed rounded p-3 flex items-center mb-3">
          <Banknote className="w-6 h-6 mr-2" />
          <span className="font-medium">Bank Account</span>
        </div>

        <p className="font-semibold text-sm mb-2">Enter the following account details</p>

        <input
          type="number"
          className="w-full border bg-gray-100 p-2 rounded mb-2"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          className="w-full border bg-gray-100 p-2 rounded mb-2"
          placeholder="IFSC Code (11 characters)"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
        />
        <input
          className="w-full border bg-gray-100 p-2 rounded mb-2"
          placeholder="Account Holder Name"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
        />
        <p className="text-xs text-gray-500 mb-3">As per your bank account</p>

        <button
          onClick={handleBankLink}
          className="w-full bg-black text-white py-2 rounded mb-6"
        >
          Link Bank Account
        </button>

        {/* UPI Section */}
        <div className="border border-dashed rounded p-3 flex items-center mb-3">
          <img src="https://images.icon-icons.com/2699/PNG/512/upi_logo_icon_169316.png" alt="upi" className="w-6 h-6 mr-2" />
          <span className="font-medium">UPI</span>
        </div>

        <p className="font-semibold text-sm mb-2">Enter correct UPI ID to withdraw money</p>

        <div className="flex items-center gap-2 mb-4">
          <input
            className="flex-1 border bg-gray-100 p-2 rounded"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <button
            onClick={handleUpiLink}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Link
          </button>
        </div>

        {/* Placeholder Radio + Disabled Button */}
        <div className="text-sm text-gray-600 mb-3">
          <input type="radio" className="mr-2" />
          Add new UPI ID
        </div>

        <button className="w-full bg-gray-300 text-gray-600 py-2 rounded" disabled>
          Link
        </button>
      </div>
    </div>
  );
}
