import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Wallet,Phone,Info,Shield,FileText} from "lucide-react";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user-details/get-profile-info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setUserDetails(data.details);
        }
      } catch (err) {
        console.error("Error fetching profile details:", err);
      }
    };

    fetchDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-6 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b">
          <button onClick={() => navigate(-1)} className="text-xl font-bold mr-2"></button>
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          {/* Profile Info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"
              alt="Profile" className="w-14 h-14 rounded-full"/>
            <div>
              <p className="font-semibold text-gray-900 text-base">
                {userDetails?.fullName || "User Name"}
              </p>
              <p className="text-sm text-gray-500">
                {userDetails?.profession || "User Profession"}
              </p>
            </div>
          </div>

          {/* Menu List */}
          <div className="space-y-4">
            {[
             { label: "Wallet", icon: <Wallet className="h-5 w-5" /> },
             { label: "Contact Us", icon: <Phone className="h-5 w-5" /> },
             { label: "About Us", icon: <Info className="h-5 w-5" /> },
             { label: "Privacy & Policy", icon: <Shield className="h-5 w-5" /> },
             { label: "Terms & Conditions", icon: <FileText className="h-5 w-5" /> },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3" >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    <span>{item.icon}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{item.label}</p>
                </div>
                <span className="text-xl">&#8250;</span>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} className="w-full bg-black text-white font-semibold py-3 rounded mt-5"> Log out </button>
        </div>
      </div>
    </div>
  );
}
