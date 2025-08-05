import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const brands = {
  iPhone: ["iPhone 12 Pro Max","iPhone 13", "iPhone 14", "iPhone 15 Pro Max", "iPhone 16 Pro Max"],
  Samsung: ["Galaxy S22", "Galaxy S23 Ultra","Galaxy S24 Ultra" ,"Galaxy S24 Ultra Pro Max","Galaxy Z Fold"]
};

const questions = [
  "How satisfied are you with the product?",
  "Would you recommend this product to others?",
  "How would you rate the quality?",
  "How satisfied are you with the price?",
  "How easy was the setup?",
  "How would you rate the customer service?",
  "How likely are you to repurchase?",
  "How does the product compare to similar products?",
  "What do you think about the design?",
  "Would you like to see improved features?"
];

export default function FeedbackFormPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [answers, setAnswers] = useState(Array(10).fill(0));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const redirect=useNavigate()

  const handleRatingChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post("http://localhost:8000/api/feedback/submit-feedback",
      {
        brand,
        model,
        serialNumber,
        answers,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      alert("Feedback submitted successfully...👍");
      setBrand("");
      setModel("");
      setSerialNumber("");
      setAnswers(Array(10).fill(0)); 
      redirect('/upload')
    }
  } catch (err) {
    console.error("Submit error:", err);
    alert("Error submitting feedback...!");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6">
        <h1 className="text-xl font-semibold text-gray-700 mb-4">Product Feedback</h1>

        <div className="flex gap-3 mb-4">
          <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }} className="w-1/2 px-3 py-2 border rounded-xl">
            <option value="">Select brand</option>
            {Object.keys(brands).map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select value={model} onChange={(e) => setModel(e.target.value)} className="w-1/2 px-3 py-2 border rounded-xl">
            <option value="">Model</option>
            {brands[brand]?.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <input type="text" placeholder="Enter your serial number here" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} className="w-full px-3 py-2 border rounded-xl mb-6" />

        <h2 className="text-md font-semibold text-gray-600 mt-3 mb-4">Product Questions</h2>

        {questions.map((q, i) => (
          <div key={i} className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">{i + 1}. {q}</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-xl cursor-pointer ${answers[i] >= star ? "text-yellow-400" : "text-gray-300"}`} onClick={() => handleRatingChange(i, star)}>★</span>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleSubmit} className="bg-blue-600 text-white font-medium py-2 px-4 rounded-xl w-full mt-4 hover:bg-blue-700">  Submit Ratings </button>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-4 text-center">Feedback submitted successfully...👍</p>}
      </div>
    </div>
  );
}
