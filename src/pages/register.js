import React, { useState } from "react";
import FormWrapper from "../components/shared/FormWrapper.js";
import InputField from "../components/shared/InputField.js";
import BigBtn from "../components/shared/BigBtn.js";
import DropdownList from "../components/shared/DropdownList.js";
import { validateRegisterForm } from "../utils/validation.js";
import {Link} from "react-router-dom"       


export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idImage, setIdImage] = useState(null);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    role: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const roleOptions = [
    { id: "Patient", name: "Patient" },
    { id: "Doctor", name: "Doctor" },
  ];

  const submit = (e) => {
    e.preventDefault();
    const { valid, errors } = validateRegisterForm({
      fullName,
      email,
      role,
      gender,
      password,
      confirmPassword,
    });
    setErrors(errors);
    if (valid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 mt-4 mb-4">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Your Account</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.<br />
          Sit aliquid, Non distinctio vel iste.
        </p>

        <FormWrapper className="space-y-4" onSubmit={submit}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          <DropdownList
            label="Role"
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            error={errors.role}
          />

          {role === "Doctor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload ID Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIdImage(e.target.files[0])}
                className="block w-full text-sm border rounded px-3 py-2"
              />
            </div>
          )}

          <div className="text-sm text-gray-600 mt-4">
            <label className="flex items-start gap-2">
              <input type="checkbox" required />
              <span>
                I consent to Herbal processing my personal data in order to send personalized
                marketing material in accordance with the consent form and the privacy policy.
              </span>
            </label>
            <label className="flex items-start gap-2 mt-2">
              <input type="checkbox" required />
              <span>
                By clicking "Create account", I consent to the privacy policy.
              </span>
            </label>
          </div>

          <BigBtn text="CREATE ACCOUNT" onClick={submit} className="w-full bg-[#0A9A73] text-white hover:bg-[#08825f]" />

          <p className="text-xs text-center text-gray-500 mt-4">
            By creating an account, you agree to our:
          </p>
          <div className="flex justify-center gap-4 text-sm underline text-gray-600">
            <a href="#">TERMS OF CONDITIONS</a>
            <a href="#">PRIVACY POLICY</a>
          </div>
            <Link  to="/login"> 
            <a className="text-center text-sm text-gray-700 mt-4">
                ALREADY HAVE AN ACCOUNT ?
            </a>
           </Link>

        </FormWrapper>
      </div>
    </div>
  );
}
