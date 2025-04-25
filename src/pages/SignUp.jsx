import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setMessage("User already exists. Please sign in.");
        setLoading(false);
        return;
      }

      await setDoc(userRef, {
        name,
        email,
        createdAt: new Date(),
      });

      setMessage("Account created successfully. Please sign in.");
      navigate("/sign-in");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already in use.");
      } else {
        console.error(error);
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <p className="text-white text-lg font-medium">
          Just a moment please, Almost there!!
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
            Unlock Your Career Potential with AI
          </h3>

          <form onSubmit={register} className="w-full space-y-6 mt-4 form">
            <div>
              <label htmlFor="name" className="text-light-100 dark:text-light-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-light-100 dark:text-light-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-light-100 dark:text-light-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
              />
            </div>

            <button
              className={`btn w-full ${
                loading ? "opacity-70 animate-pulse cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create an Account"}
            </button>
          </form>

          <p className="text-center">
            Have an account already?
            <Link to="/sign-in" className="font-bold color-primary-100 ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
