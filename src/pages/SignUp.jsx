import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="auth-layout">
      <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <img src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100">Evalio</h2>
          </div>

          <h3 className="text-primary-200 text-center text-[22px] lg:text-xl">
            Unlock Your Career Potential with AI
          </h3>
          <form onSubmit={() => {}} className="w-full space-y-6 mt-4 form">
            <div>
              <label
                htmlFor="name"
                className="text-light-100 dark:text-light-300 mb-2"
              >
                Name
              </label>
              <input
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
                type="text"
                placeholder="Enter your name"
                id="name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-light-100 dark:text-light-300 mb-2"
              >
                Email
              </label>
              <input
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
                type="email"
                placeholder="Enter your email"
                id="email"
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
                className="block w-full px-4 py-2 border rounded-md text-sm text-dark-100 dark:text-light-100 bg-dark-200 dark:bg-dark-300 border-dark-400 dark:border-dark-500 focus:outline-none focus:ring-1 focus:ring-primary-200 dark:focus:ring-primary-100 focus:border-primary-200 dark:focus:border-primary-100 mt-1"
                type="password"
                placeholder="Enter your password"
                id="password"
              />
            </div>

            <button className="btn" type="submit">
              Create an Account
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
