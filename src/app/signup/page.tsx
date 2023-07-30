"use client";

import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}
function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        // Handle successful signup
        // For example, show a success message or redirect to the login page
        Router.push("/login");
      } else {
        // Handle signup error
        const errorData = await response.json();
        console.log("Signup error:", errorData);
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
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
              Signup
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <p className="text-blue-500 hover:underline">Go to Login</p>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
