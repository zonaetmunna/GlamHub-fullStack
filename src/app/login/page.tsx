"use client";

import Link from "next/link";
import Router from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await fetch("../api/auth/auth", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        // Handle successful login
        // For example, save the authentication token and redirect to the dashboard
        Router.push("/dashboard");
      } else {
        // Handle login error
        const errorData = await response.json();
        console.log("Login error:", errorData);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          <p> Dont have an account? </p>
          <Link href="/signup">
            <p className="text-blue-500 hover:underline">Go to Signup</p>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
