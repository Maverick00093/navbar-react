import React from 'react';

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeTab, handleTabChange }) => {
  const navItems = ['Home', 'Shop', 'Blog', 'About', 'Contact'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <div className="logo">
            <div className="logo-square"></div>
            <div className="logo-square"></div>
            <div className="logo-square"></div>
            <div className="logo-square"></div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeTab === item ? 'active' : ''}`}
              onClick={() => handleTabChange(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <span className="close-icon">×</span>
          ) : (
            <div className="hamburger">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <div className="logo">
              <div className="logo-square"></div>
              <div className="logo-square"></div>
              <div className="logo-square"></div>
              <div className="logo-square"></div>
            </div>
            <button 
              className="close-mobile-menu"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <div className="mobile-menu-items">
            {navItems.map((item) => (
              <button
                key={item}
                className={`mobile-nav-item ${activeTab === item ? 'active' : ''}`}
                onClick={() => handleTabChange(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;