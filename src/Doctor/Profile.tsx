import React, { useState } from "react";

interface DoctorProfileData {
  photo: string;
  name: string;
  specialty: string;
  contact: string;
  email: string;
  bio: string;
}

const DoctorProfile: React.FC = () => {
  // Initial dummy data; in a real app, this would come from your backend or context
  const initialProfile: DoctorProfileData = {
    photo: "https://via.placeholder.com/150",
    name: "Dr. Jane Doe",
    specialty: "Cardiology",
    contact: "+1 (555) 123-4567",
    email: "jane.doe@example.com",
    bio: "Passionate about heart health and dedicated to providing the best care for my patients.",
  };

  const [profile, setProfile] = useState<DoctorProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // In a real app, send data to the backend here.
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white mt-10">
      <div className="flex items-center space-x-6">
        <img
          src={profile.photo}
          alt="Doctor Profile"
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded-lg border border-gray-600 text-white mb-2 w-full"
              />
              <input
                type="text"
                name="specialty"
                value={profile.specialty}
                onChange={handleChange}
                className="bg-gray-700 p-2 rounded-lg border border-gray-600 text-white mb-2 w-full"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-lg text-gray-300">{profile.specialty}</p>
            </>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        {isEditing ? (
          <>
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleChange}
              className="bg-gray-700 p-2 rounded-lg border border-gray-600 text-white my-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="bg-gray-700 p-2 rounded-lg border border-gray-600 text-white my-2 w-full"
            />
          </>
        ) : (
          <div>
            <p>
              <strong>Phone:</strong> {profile.contact}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
          </div>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">About Me</h2>
        {isEditing ? (
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="bg-gray-700 p-2 rounded-lg border border-gray-600 text-white my-2 w-full"
            rows={4}
          ></textarea>
        ) : (
          <p className="mt-2 text-gray-300">{profile.bio}</p>
        )}
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
