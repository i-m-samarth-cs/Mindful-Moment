import React from 'react';
import Container from '../components/ui/Container';
import Profile from '../components/Profile';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Profile />
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;