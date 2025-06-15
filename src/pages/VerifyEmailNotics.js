import React from "react";
import { Link } from "react-router-dom";

export default function VerifyEmailNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="mb-6">
          We've sent a verification link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>
        <p className="mb-6">
          If you didn't receive the email, check your spam folder or{" "}
          <button className="text-blue-600">resend verification email</button>.
        </p>
        <Link
          to="/login"
          className="inline-block px-4 py-2 bg-[#0A9A73] text-white rounded hover:bg-[#08825f]"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
