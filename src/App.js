import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import CricketInventory from './Components/CricketInventory';


function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Shop':
        return <CricketInventory />;
      case 'Home':
        return (
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to Cricket Gear Pro</h1>
            <p className="text-lg mb-6">Your one-stop shop for professional cricket equipment</p>
            <button 
              className="bg-emerald-500 text-white px-6 py-2 rounded-md hover:bg-emerald-600 transition-colors"
              onClick={() => handleTabChange('Shop')}
            >
              Browse Inventory
            </button>
          </div>
        );
      case 'Blog':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cricket Blog</h2>
            <p className="mb-4">Latest cricket news and gear reviews coming soon!</p>
          </div>
        );
      case 'About':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="mb-4">Cricket Gear Pro is dedicated to providing high-quality cricket equipment for professionals and enthusiasts alike.</p>
          </div>
        );
      case 'Contact':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">Email: info@cricketgearpro.com</p>
            <p className="mb-4">Phone: +1 (555) 123-4567</p>
          </div>
        );
      default:
        return <div className="p-6">Select a tab from the navigation menu</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <main className="pt-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;