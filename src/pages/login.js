import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, setCredentials } from "../features/authSlice";
import FormWrapper from "./../components/shared/FormWrapper";
import InputField from "./../components/shared/InputField";
import BigBtn from "./../components/shared/BigBtn";
import { validateLoginForm } from "../utils/validation";
import { Link } from "react-router-dom";
import Spinner from "../components/shared/Spinner";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors } = validateLoginForm(
      formData.email,
      formData.password
    );
    setErrors(errors);

    if (valid) {
      try {
        const result = await dispatch(loginUser(formData));

        if ( loginUser.fulfilled.match( result ) ) {
          dispatch(
            setCredentials({
              user: result.payload.user,
              accessToken: result.payload.access,
              refreshToken: result.payload.refresh,
            })
          );
  
          // Redirect based on user role
          console.log(result.payload);
          if (result.payload.user.role == "doctor") {
            navigate("/doctor");
          } else if (result.payload.user.role == "patient") {
            navigate("/patient");
          }
          else if (result.payload.user.role == "admin") {
            // redirect to http://localhost:8000/admin
            window.location.href = "http://localhost:8000/admin";
          }
        } 
      } catch (err) {
        console.error("Login error:", err);
        setErrors({
          email: "An error occurred",
          password: "An error occurred",
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#eaf5f0] py-12">
      <div className="bg-white w-[1000px] rounded-md shadow-lg flex overflow-hidden border border-gray-300">
        <div className="w-1/2 p-12">
          <FormWrapper className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">Sign In</h1>
              <h2 className="text-xl font-semibold text-gray-800">
                To Your Account
              </h2>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                {typeof error === "string"
                  ? error
                  : error.message || "Login failed"}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <InputField
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <InputField
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <BigBtn
              text={loading ? <Spinner /> : "SIGN IN"}
              onClick={handleSubmit}
              className="text-white hover:bg-[#08825f] w-full mt-2"
              disabled={loading}
            />

            <div className="text-sm text-center mt-4">
              <a href="#" className="text-gray-600 hover:underline">
                FORGOTTEN YOUR PASSWORD?
              </a>
            </div>
          </FormWrapper>
        </div>

        <div className="w-1/2 relative overflow-hidden flex items-center justify-center p-10 bg-[#0A9A73]">
          <img
            src="/images/c2.jpeg"
            alt="Login Visual"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          <div className="relative z-10 text-center text-white">
            <h3 className="text-lg font-semibold mb-4 pb-1 border-b border-blue-300 w-fit mx-auto">
              DON'T HAVE AN ACCOUNT?
            </h3>
            <p className="text-sm mb-2">Create an account to get started</p>
            <Link to="/register">
              <BigBtn
                text="CREATE ACCOUNT"
                variant="outline"
                className="bg-[#0A9A73] text-white hover:bg-[#08825f] px-6 py-2 rounded"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
