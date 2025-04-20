// components/Profile.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface ProfileData {
  email: string;
  name: string;
  role: string;
  bio: string;
  joinedDate: string;
  avatar: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

const Profile: React.FC = () => {
  // Demo profile data with the specified email
  const [profile, setProfile] = useState<ProfileData>({
    email: "samarthscoe@gmail.com",
    name: "Samarth Sharma",
    role: "Full Stack Developer",
    bio: "Passionate developer with experience in React, Node.js, and TypeScript. Love building user-friendly applications and exploring new technologies.",
    joinedDate: "January 2023",
    avatar: "/api/placeholder/150/150",
    stats: {
      posts: 42,
      followers: 215,
      following: 183
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
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring focus:ring-blue-200"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="bg-blue-600 text-white p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 mb-4 md:mb-0 md:mr-6">
                <Image
                  src={profile.avatar} 
                  alt={profile.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-sm text-blue-100">{profile.role}</p>
                <p className="text-sm text-blue-100 mt-1">Member since {profile.joinedDate}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Profile Information</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-200"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{profile.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Bio</p>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <h3 className="text-lg font-medium mb-4">Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold">{profile.stats.posts}</p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold">{profile.stats.followers}</p>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold">{profile.stats.following}</p>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;