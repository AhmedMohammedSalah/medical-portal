import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/authSlice";
import FormWrapper from "../components/shared/FormWrapper";
import InputField from "../components/shared/InputField";
import BigBtn from "../components/shared/BigBtn";
import DropdownList from "../components/shared/DropdownList";
import { validateRegisterForm } from "../utils/validation";
import { Link } from "react-router-dom";
import Spinner from "../components/shared/Spinner";


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "", 
    patient_image_path: null,
    national_id_image_path: null,
    date_of_birth: "",
  });
  const [idImage, setIdImage] = useState(null);
  const [patientImage, setPatientImage] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const roleOptions = [
    { id: "patient", name: "Patient" },
    { id: "doctor", name: "Doctor" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (formData.role === "doctor") {
      setIdImage(file);
    } else if (formData.role === "patient") {
      setPatientImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = validateRegisterForm(formData);
    setErrors(errors);
    
    // if (!valid) {
    //   console.log("Validation errors:", errors);
    //   return;
    // }

    try {
      const userData = new FormData();
      userData.append("name", formData.fullName);
      userData.append("email", formData.email);
      userData.append("password", formData.password);
      userData.append("role", formData.role);

      if (formData.role === "doctor" && idImage) {
        userData.append("doctor_id_image_path", idImage);
      }
      
      if (formData.role === "patient") {
        if (!patientImage || !formData.date_of_birth) {
          setErrors({
            ...errors, 
            patientImage: !patientImage ? "Patient image is required" : undefined,
            date_of_birth: !formData.date_of_birth ? "Date of birth is required" : undefined
          });
          return;
        }
        userData.append("patient_image_path", patientImage);
        userData.append("date_of_birth", formData.date_of_birth);
      }
      console.log("User Data:", Object.fromEntries(userData.entries()));

      const result = await dispatch(registerUser(userData));
      
      if (registerUser.fulfilled.match(result)) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 mt-4 mb-4">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Your Account</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Create your account to get started
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {typeof error === "object"
              ? error.message || error.error || JSON.stringify(error)
              : error}
          </div>
        )}

        <FormWrapper className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <DropdownList
            label="Role"
            name="role"
            options={roleOptions}
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
          />

          {formData.role === "doctor" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload ID Image
              </label>
              <input
                type="file"
                name="idImage"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm border rounded px-3 py-2"
                required
              />
            </div>
          )}

          {formData.role === "patient" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload your Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="patientImage"
                onChange={handleFileChange}
                className="block w-full text-sm border rounded px-3 py-2"
              />

              <InputField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                error={errors.date_of_birth}
                className="mt-2"
              />
            </div>
          )}

          <div className="text-sm text-gray-600 mt-4">
            <label className="flex items-start gap-2">
              <input type="checkbox" required />
              <span>
                I consent to processing my personal data in accordance with the
                privacy policy.
              </span>
            </label>
          </div>

          <BigBtn
            text={loading ? <Spinner /> : "CREATE ACCOUNT"}
            onClick={handleSubmit}
            className="w-full bg-[#0A9A73] text-white hover:bg-[#08825f]"
            disabled={loading}
            type="submit"
          />

          <div className="flex justify-center gap-4 text-sm underline text-gray-600">
            <a href="#">TERMS OF CONDITIONS</a>
            <a href="#">PRIVACY POLICY</a>
          </div>

          <Link
            to="/login"
            className="text-center text-sm text-gray-700 mt-4 block"
          >
            ALREADY HAVE AN ACCOUNT?
          </Link>
        </FormWrapper>
      </div>
    </div>
  );
}