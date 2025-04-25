import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Adjust the import path for firebase
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset any previous messages
    setLoading(true); // Show loading animation

    try {
      // Assuming Firebase authentication for login
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
      navigate("/"); // Redirect to another page after successful login
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Hide loading animation after the request completes
    }
  };

  return (
    <div className="auth-layout relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">
          Logging in...
          </p>
        </div>
      )}

      <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <img src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100">Evalio</h2>
          </div>

          <h3 className="text-primary-200 text-center text-[22px] lg:text-xl">
            Log In to Boost Your Interview Skills
          </h3>

          <form onSubmit={handleLogin} className="w-full space-y-6 mt-4 form">
            <div>
              <label
                htmlFor="email"
                className="text-light-100 dark:text-light-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
                disabled={loading} // Disable input while loading
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-light-100 dark:text-light-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
                disabled={loading} // Disable input while loading
              />
            </div>

            <button
              className={`btn w-full ${loading ? "opacity-70 animate-pulse cursor-not-allowed" : ""}`}
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {message && (
            <p className="text-center text-red-500 mt-4">{message}</p>
          )}

          <p className="text-center">
            No account yet?
            <Link to="/sign-up" className="font-bold color-primary-100 ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
