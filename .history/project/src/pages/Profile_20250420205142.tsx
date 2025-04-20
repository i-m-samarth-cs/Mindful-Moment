// pages/profile.tsx
import React, { useState } from 'react';

interface ProfileData {
  email: string;
  name: string;
  role: string;
  bio: string;
  joinedDate: string;
  stats: {
    meditations: number;
    moodLogs: number;
    journalEntries: number;
  };
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    email: "samarthscoe@gmail.com",
    name: "Samarth Sh",
    role: "Mindfulness Seeker",
    bio: "Exploring the power of thoughts, practicing mindfulness daily, and journaling my journey to inner peace and mental clarity.",
    joinedDate: "January 2023",
    stats: {
      meditations: 58,
      moodLogs: 120,
      journalEntries: 36
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="py-6 px-4">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700">Mind Profile</h1>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Mind Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Your Journey</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="bg-purple-600 text-white p-6 rounded-t-xl">
                <div className="flex items-center">
                  <div className="h-20 w-20 rounded-full bg-white text-purple-600 font-bold text-3xl flex items-center justify-center mr-4">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-sm">{profile.role}</p>
                    <p className="text-sm mt-1">Joined in {profile.joinedDate}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-700">Mind Journey</h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm hover:bg-purple-200"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{profile.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Your Journey</p>
                    <p>{profile.bio}</p>
                  </div>
                </div>

                <div className="border-t mt-6 pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Mind Stats</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-purple-50 rounded-lg p-4 shadow">
                      <p className="text-2xl font-bold">{profile.stats.meditations}</p>
                      <p className="text-sm text-gray-600">Meditations</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 shadow">
                      <p className="text-2xl font-bold">{profile.stats.moodLogs}</p>
                      <p className="text-sm text-gray-600">Mood Logs</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 shadow">
                      <p className="text-2xl font-bold">{profile.stats.journalEntries}</p>
                      <p className="text-sm text-gray-600">Journals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
