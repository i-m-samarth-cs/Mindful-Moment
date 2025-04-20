import React from 'react';
import Container from '../components/ui/Container';
import Profile from '../components/Profile';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Profile</h1>
        <Profile />
      </div>
    </Container>
  );
};

export default ProfilePage;