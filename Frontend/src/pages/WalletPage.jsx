
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Banknote, Landmark } from "lucide-react";

export default function WalletPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const balance = 0; // Default ₹0
  // const redirect=useNavigate()

  const handleWithdraw = () => {
    if (Number(amount) >= 100) {
      // withdrawal logic here
      alert(`Withdrawal of ₹${amount} requested`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-[390px] bg-white text-black pb-8">
        {/* Header */}
        <div className="flex items-center px-4 py-4 border-b shadow-sm">
          <button onClick={() => navigate(-1)} className="mr-2 text-xl">
            ←
          </button>
          <h1 className="text-lg font-semibold">Wallet</h1>
        </div>

        {/* Balance Info */}
        <div className="flex items-center px-6 py-4 gap-3">
          <div className="p-2 bg-gray-100 rounded-full">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Balance :</p>
            <p className="text-xl font-semibold">₹{balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="px-6">
          <h2 className="font-semibold text-[16px] mb-2">Withdraw Your Rewards</h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-md px-4 py-3 bg-gray-100 mb-1"
          />

          <p className="text-[13px] text-gray-500 mb-4">Minimum withdrawal ₹100</p>

          <p className="font-semibold mb-2 text-[15px]">Select Withdrawal Method</p>

          {/* Bank Method */}
          <div className="flex items-center justify-between border border-dashed border-gray-400 rounded px-4 py-3 mb-4">
            <div className="flex items-center gap-3">
              <Landmark className="w-6 h-6" />
              <div>
                <p className="font-medium text-sm">Bank Account</p>
              </div>
            </div>
            <button onClick={() => navigate("/linkaccount")} className="text-xl">＋</button>
          </div>

          {/* UPI Method */}
          <div className="flex items-center justify-between border border-dashed border-gray-400 rounded px-4 py-3">
            <div className="flex items-center gap-3">
<img src="https://images.icon-icons.com/2699/PNG/512/upi_logo_icon_169316.png" alt="UPI" className="w-6 h-6" />


              <div>
                <p className="font-medium text-sm">UPI</p>
                <p className="text-xs text-gray-500">Add any UPI ID</p>
              </div>
            </div>
            <button onClick={() => navigate("/linkaccount")} className="text-xl">＋</button>
          </div>

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={Number(amount) < 100}
            className={`w-full mt-6 py-3 rounded ${
              Number(amount) >= 100 ? "bg-black text-white" : "bg-gray-300 text-gray-500"
            }`}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
