import { useState } from "react";

export default function FillDetailsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    postalCode: "",
    area: "",
    age: "",
    profession: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/user-details/submit-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Details saved successfully...👍");
        setFormData({
         fullName: "",
         postalCode: "",
         area: "",
         age: "",
         profession: "",
         gender: "",
        });
      } else {
        alert("Failed to save details...!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold mb-6"> Fill Your Details</h2>
    <hr />
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1">Full Name</label>
            <input type="text" name="fullName" placeholder="Enter your full name" className="w-full p-3 rounded bg-gray-100" onChange={handleChange} value={formData.fullName} />
          </div>

          <div>
            <label className="block mb-1">Postal Code</label>
            <input type="text" name="postalCode" placeholder="Enter your postal code" className="w-full p-3 rounded bg-gray-100" onChange={handleChange} value={formData.postalCode} />
          </div>

          <div>
            <label className="block mb-1">Area</label>
            <input type="text" name="area" placeholder="Enter your area" className="w-full p-3 rounded bg-gray-100" onChange={handleChange} value={formData.area} />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1">Age</label>
              <input type="number" name="age" placeholder="Enter your age" className="w-full p-3 rounded bg-gray-100" onChange={handleChange} value={formData.age} />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Profession</label>
              <select name="profession" className="w-full p-3 rounded bg-gray-100" onChange={handleChange} value={formData.profession} >
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Engineer">Engineer</option>
                <option value="Developer">Developer</option>
                <option value="Teacher">Teacher</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">Gender</label>
            <div className="flex gap-2">
              {["Male", "Female", "Other"].map((g) => (
                <button type="button" key={g} onClick={() => handleGenderSelect(g)}
                  className={`px-4 py-2 rounded border ${
                    formData.gender === g
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`} >
                  {g}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Please select your gender
            </p>
          </div>

          <button type="submit" className="w-full bg-gray-400 text-white font-medium py-3 mt-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
