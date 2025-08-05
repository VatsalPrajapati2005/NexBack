// import { useState } from "react";

// export default function UploadVideoReview() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("video/")) {
//       setVideoFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     } else {
//       alert("Please select a valid video file.");
//     }
//   };

//   const handleCancel = () => {
//     setVideoFile(null);
//     setPreviewUrl("");
//   };

//   const handleSubmit = async () => {
//     if (!videoFile) return alert("Please upload a video first.");

//     const formData = new FormData();
//     formData.append("video", videoFile);

//     try {
//       const res = await fetch("http://localhost:8000/api/video/upload-video", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       if (data.success) {
//         alert("Video uploaded successfully!");
//         handleCancel();
//       } else {
//         alert("Upload failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error uploading video.");
//     }
//   };

//   return (
//     <div className="min-h-screen px-4 py-6 bg-gray-100 flex items-center justify-center">
//       <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-md">
//         <h1 className="text-xl font-bold text-gray-800 mb-4">Upload Video Review</h1>

//         <div className="w-full h-48 border border-gray-300 rounded-xl flex items-center justify-center bg-gray-100 mb-4">
//           {previewUrl ? (
//             <video src={previewUrl} controls className="w-full h-full rounded-xl object-cover" />
//           ) : (
//             <p className="text-gray-500">Upload or Record Video</p>
//           )}
//         </div>

//         <p className="font-medium text-gray-600 mb-2">Choose Video Source</p>
//         <div className="flex space-x-3 mb-4">
//           <label className="flex-1 bg-blue-600 text-white font-semibold rounded-xl px-4 py-2 text-center cursor-pointer">
//             Upload Video
//             <input
//               type="file"
//               accept="video/*"
//               name="video"
//               onChange={handleVideoChange}
//               className="hidden"
//             />
//           </label>
//           <label className="flex-1 bg-gray-200 text-gray-700 font-semibold rounded-xl px-4 py-2 text-center cursor-pointer">
//             Shoot Video
//             <input
//               type="file"
//               accept="video/*"
//               capture="environment"
//               onChange={handleVideoChange}
//               className="hidden"
//             />
//           </label>
//         </div>

//         <p className="text-sm text-gray-500 mb-4">
//           Select your preferred way to submit your review.
//         </p>

//         <div className="flex justify-between">
//           <button
//             onClick={handleCancel}
//             className="w-1/2 mr-2 border border-gray-400 text-gray-700 font-semibold py-2 rounded-xl"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className={`w-1/2 ml-2 bg-blue-600 text-white font-semibold py-2 rounded-xl ${
//               !videoFile ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
//             }`}
//             disabled={!videoFile}
//           >
//             Verify
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { PhotoIcon, CameraIcon } from "@heroicons/react/24/solid";

export default function UploadVideoReview() {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a valid video file...!");
    }
  };

  const handleCancel = () => {
    setVideoFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async () => {
    if (!videoFile) return alert("Please upload a video first.");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await fetch("http://localhost:8000/api/video/upload-video", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Video uploaded successfully...😃");
        handleCancel();
      } else {
        alert("Upload failed...");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading video...");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-5 rounded-xl shadow-md">
        <h1 className="!text-[22px] font-semibold text-gray-800 mb-4 text-center">
          Upload Video Review
        </h1>

        <div className="w-full h-48 border border-gray-300 rounded-xl flex items-center justify-center bg-gray-100 mb-4">
          {previewUrl ? (
            <video src={previewUrl} controls className="w-full h-full rounded-xl object-cover" />
          ) : (
            <p className="text-gray-500">Upload or Record Video</p>
          )}
        </div>

        <p className="font-medium text-gray-600 mb-2">Choose Video Source</p>

        <div className="flex space-x-3 mb-4">
          <label className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2 cursor-pointer flex items-center justify-center space-x-2 w-full">
  <span className="flex items-center space-x-2">
    <PhotoIcon className="h-5 w-5" />
    <span className="whitespace-nowrap">Upload Video</span>
  </span>
  <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden"/>
</label>

<label className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl px-4 py-2 cursor-pointer flex items-center justify-center space-x-2 w-full">
  <span className="flex items-center space-x-2">
    <CameraIcon className="h-5 w-5" />
    <span className="whitespace-nowrap">Shoot Video</span>
  </span>
  <input type="file" accept="video/*" capture="environment" onChange={handleVideoChange}  className="hidden"/>
</label>
        </div>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Select your preferred way to submit your review.
        </p>

        <div className="flex gap-4">
          <button onClick={handleCancel} className="w-1/2 border border-gray-400 text-gray-700 font-semibold py-2 rounded-xl" > Cancel </button>
          <button onClick={handleSubmit} className={`w-1/2 bg-blue-600 text-white font-semibold py-2 rounded-xl ${
              !videoFile ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`} disabled={!videoFile} > Verify </button>
        </div>
      </div>
    </div>
  );
}
