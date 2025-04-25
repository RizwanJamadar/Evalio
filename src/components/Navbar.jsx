import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../lib/userStore"; // Your Zustand store

const Navbar = () => {
  const [avatarText, setAvatarText] = useState(""); // Store avatar text
  const [userName, setUserName] = useState(""); // Store full user name

  // Access the currentUser from Zustand store
  const { currentUser } = useUserStore();

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

  return (
    <nav className="flex justify-between items-center bg-transparent py-4 px-6 shadow-none">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Evalio Logo" width={38} height={32} />
        <h2 className="text-primary-100">Evalio</h2>
      </Link>

      {currentUser && (
        <div className="flex items-center gap-4">
           {/* Profile Avatar */}
           <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center text-black font-bold">
            {avatarText} {/* Display initials or first letter */}
          </div>
          
          {/* Greeting Message */}
          <p className="text-light-100 dark:text-light-300">
            Hello, {userName.split(" ")[0]} {/* Display first name */}
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
