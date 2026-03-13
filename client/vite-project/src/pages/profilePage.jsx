import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-gray-500 text-lg">You are not signed in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md border border-emerald-100">
      {/* Header */}
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-28 h-28 bg-emerald-500 rounded-full flex items-center justify-center text-white text-5xl font-bold">
          {user.name[0].toUpperCase()}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-gray-700">{user.name}</h1>
        <p className="text-gray-500 capitalize">{user.role}</p>
      </div>

      {/* User Info */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-800">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{user.email || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Role:</span>
          <span className="text-gray-800">{user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;