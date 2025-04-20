import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from './ui/Button';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import { User, Settings, LogOut, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    avatar_url: null,
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);

  // Debug logs
  console.log("Profile component rendering");
  console.log("User from useAuth:", user);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      console.log("Fetching profile for user:", user.id);
      setLoading(true);
      
      // Check if profiles table exists and create profile if it doesn't exist yet
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url, bio')
        .eq('id', user.id)
        .single();
      
      console.log("Profile data:", data);
      console.log("Profile error:", profileError);

      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 means no rows returned
        throw profileError;
      }

      if (data) {
        setProfile(data);
        setEditableProfile(data);
      } else {
        // Create a default profile if none exists
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: user.id, 
              username: user.email?.split('@')[0] || '',
              full_name: '',
              avatar_url: null,
              bio: '',
              created_at: new Date(),
              updated_at: new Date()
            }
          ]);
          
        console.log("Insert error:", insertError);
        
        if (insertError) throw insertError;
        
        // Set default profile values
        const defaultProfile = {
          username: user.email?.split('@')[0] || '',
          full_name: '',
          avatar_url: null,
          bio: ''
        };
        
        setProfile(defaultProfile);
        setEditableProfile(defaultProfile);
      }
    } catch (err) {
      console.error("Error in fetchProfile:", err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Update profile in the database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: editableProfile.username,
          full_name: editableProfile.full_name,
          avatar_url: editableProfile.avatar_url,
          bio: editableProfile.bio,
          updated_at: new Date()
        });
      
      if (error) throw error;
      
      // Update local state
      setProfile(editableProfile);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditableProfile(profile);
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditableProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          <div className="text-center py-4">
            <p className="mb-4">You need to sign in to view your profile.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2" size={20} />
          Profile
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={48} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {isEditing ? (
            // Edit mode
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={editableProfile.username}
                  onChange={(e) => handleFieldChange('username', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editableProfile.full_name}
                  onChange={(e) => handleFieldChange('full_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={editableProfile.bio}
                  onChange={(e) => handleFieldChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          ) : (
            // View mode
            <>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Username</h3>
                <p className="mt-1">{profile.username || '-'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1">{profile.full_name || '-'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="mt-1">{profile.bio || '-'}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2">
        {isEditing ? (
          <>
            <Button 
              onClick={handleSaveProfile} 
              disabled={loading}
              icon={<Save size={18} />}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancelEdit}
              icon={<X size={18} />}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={() => setIsEditing(true)}
              icon={<Settings size={18} />}
            >
              Edit Profile
            </Button>
            <Button 
              variant="outline" 
              onClick={signOut}
              icon={<LogOut size={18} />}
            >
              Sign Out
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default Profile;