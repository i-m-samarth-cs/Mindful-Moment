// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, Bell, LogIn, User } from 'lucide-react';
import Button from './ui/Button';
import Container from './ui/Container';
import WalletConnect from './WalletConnect';
import AuthModal from './AuthModal';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Navigation links array
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/exercises', label: 'Exercises' },
    { path: '/community', label: 'Community' },
    { path: '/resources', label: 'Resources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <div className="flex items-left justify-between h-16">
          {/* Left side: Logo and Brand (always at left) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 focus:outline-none">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                MindfulMoment
              </span>
            </Link>
          </div>

          {/* Desktop Navigation with increased spacing */}
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Action Buttons */}
          <div className="flex items-center space-x-4">
            <WalletConnect />

            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="outline" size="sm" icon={<User size={16} />}>
                    Profile
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button size="sm" icon={<LogIn size={16} />} onClick={() => setIsAuthModalOpen(true)}>
                Sign In
              </Button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out transform origin-top scale-95">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-lg font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-lg font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;
