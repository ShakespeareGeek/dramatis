import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const homepage = import.meta.env.VITE_HOMEPAGE_URL || 'Your Homepage';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              The Plays of William Shakespeare
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <a href={`${homepage}`} className="px-3 py-2 rounded-md hover:bg-gray-700">
              Home
            </a>
            <Link to="/shakespeare_plays" className="px-3 py-2 rounded-md hover:bg-gray-700">
              Plays
            </Link>
            <Link to="/shakespeare_characters" className="px-3 py-2 rounded-md hover:bg-gray-700">
              Characters
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="https://www.shakespearegeek.com" className="block px-3 py-2 rounded-md hover:bg-gray-700">
              Home
            </Link>
            <Link to="/shakespeare_plays" className="block px-3 py-2 rounded-md hover:bg-gray-700">
              Plays
            </Link>
            <Link to="/shakespeare_characters" className="block px-3 py-2 rounded-md hover:bg-gray-700">
              Characters
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
