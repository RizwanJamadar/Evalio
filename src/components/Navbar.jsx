import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../lib/userStore"; // Your Zustand store

const Navbar = () => {
  const [avatarText, setAvatarText] = useState(""); // Store avatar text
  const [userName, setUserName] = useState(""); // Store full user name
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle dropdown menu

  const navigate = useNavigate();

  // Access the currentUser from Zustand store
  const { currentUser, logout } = useUserStore();

  useEffect(() => {
    if (currentUser) {
      // Split the name into first and last names
      const nameParts = currentUser.name.split(" ");

      if (nameParts.length > 1) {
        const firstName = nameParts[0];
        const lastName = nameParts[nameParts.length - 1];
        
        // Set the full name and avatar initials (first letter of first and last name)
        setUserName(currentUser.name);
        setAvatarText(
          `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
        );
      } else {
        // If only one name, use the first letter
        setUserName(currentUser.name);
        setAvatarText(currentUser.name.charAt(0).toUpperCase());
      }
    }
  }, [currentUser]); // Run this effect only when `currentUser` changes

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };

  return (
    <nav className="flex justify-between items-center bg-transparent py-4 px-6 shadow-none relative">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Evalio Logo" width={38} height={32} />
        <h2 className="text-primary-100">Evalio</h2>
      </Link>

      {currentUser && (
        <div className="relative flex items-center gap-4">
          {/* Profile Avatar */}
          <div
            className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold cursor-pointer"
            onClick={toggleDropdown}
          >
            {avatarText} {/* Display initials or first letter */}
          </div>

          {/* Greeting Message */}
          <p className="text-light-100 dark:text-light-300 cursor-pointer" onClick={toggleDropdown}>
            Hello, {userName.split(" ")[0]} {/* Display first name */}
          </p>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-14 bg-primary-200 text-black rounded-xl shadow-lg border border-dark-400 py-2 w-44 sm:w-48 md:w-52 z-20">
            <Link
              to="/interview"
              className="block px-4 py-2 rounded-md mx-2 my-1 text-sm font-medium hover:text-neutral-800 transition-colors duration-200"
              onClick={() => setDropdownOpen(false)}
            >
              Coding
            </Link>
          
            <Link
              to="/interview"
              className="block px-4 py-2 rounded-md mx-2 my-1 text-sm font-medium hover:text-neutral-800 transition-colors duration-200"
              onClick={() => setDropdownOpen(false)}
            >
              Interviews
            </Link>
          
            <button
              onClick={handleLogout}
              className="w-[calc(100%-1rem)] mx-2 my-1 px-4 py-2 text-sm rounded-md bg-primary-300 text-black shadow-md font-semibold text-left"
            >
              Logout
            </button>
          </div>
          
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
