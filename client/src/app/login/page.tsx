"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebase/clientApp";
import invisLogo from "../assets/invis-Image.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill out all required fields.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Login successful:", { email, userId: user.uid });
      router.push("/data-dashboard-page");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleFaceAuth = () => {
    router.push("/face-auth-login");
  };

  return (
    <section className="pt-3 pb-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-2">
          <div className="flex justify-center">
            <Image
              src={invisLogo}
              alt="Invis logo"
              className="object-contain mix-blend-multiply logo-color"
              width={100}
              height={50}
            />
          </div>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/signup"
                className="font-medium text-[#1E40AF] hover:text-[#2563EB]"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#1E40AF] focus:text-[#2563EB] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-[#1E40AF] hover:text-[#2563EB]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button type="submit" className="sign-btn" onClick={handleSubmit}>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2-2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div>
              <button
                type="button"
                className="sign-btn"
                onClick={handleFaceAuth}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 2a8 8 0 1 1-8 8 8 8 0 0 1 8-8zm0 14a6 6 0 1 0-6-6 6 6 0 0 0 6 6zm-2-6a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm-2.5 0a4.5 4.5 0 0 1 9 0h-1a3.5 3.5 0 0 0-7 0h-1z" />
                  </svg>
                </span>
                Sign in with Face Authentication
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
