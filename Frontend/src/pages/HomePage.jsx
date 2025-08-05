import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-xl mx-auto shadow py-10">
      <div className="flex items-center gap-2 mb-4">
        <UserCircle className="w-8 h-8 text-blue-600" />
        <h2 className="text-xl font-semibold">Hello, User!</h2>
      </div>

      <p className="mb-4">Select the category of the product you purchased.</p>

      <h3 className="font-semibold mb-2">Select Product Category</h3>
      <div className="mb-6">
        <button
          onClick={() => navigate("/feedback")}
          className="flex items-center gap-2 border px-4 py-2 rounded shadow hover:bg-blue-50">
          📱 Smartphones
        </button>
      </div>

      <h3 className="font-semibold mb-2">Coming Soon</h3>
      <div className="flex gap-4 mb-6">
        <div className="border p-4 rounded text-center">🏠 Home Appliances</div>
        <div className="border p-4 rounded text-center">🎧 Audio Equipment</div>
      </div>

      <div className="border p-8 rounded bg-gray-100 text-center">Banner Ad</div>
    </div>
  );
}
