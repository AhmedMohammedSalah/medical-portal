import React, { useState } from "react";
import FormWrapper from "./../components/shared/FormWrapper.js";
import InputField from "./../components/shared/InputField.js";
import BigBtn from "./../components/shared/BigBtn.js";
import { validateLoginForm } from "../utils/validation.js";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"       


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const { valid, errors } = validateLoginForm(email, password);
        setErrors(errors);
        if (valid) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#eaf5f0] py-12">
            <div className="bg-white w-[1000px] rounded-md shadow-lg flex overflow-hidden border border-gray-300">

                <div className="w-1/2 p-12">
                    <FormWrapper className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">Sign In</h1>
                            <h2 className="text-xl font-semibold text-gray-800">To Your Account</h2>
                        </div>

                        <div className="text-center text-gray-500 mb-6">
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                            <p>Sit aliquid, Non distinctio vel iste.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                            <InputField
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                            <InputField
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />
                        </div>

                        <BigBtn text="SIGN IN" onClick={submit} className="text-white hover:bg-[#08825f] w-full mt-2" />

                        <div className="text-sm text-center mt-4">
                            <a href="#" className="text-gray-600 hover:underline">FORGOTTEN YOUR PASSWORD?</a>
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
            <p className="text-sm mb-2">Add items to your wishlist • get personalised recommendations</p>
            <p className="text-sm mb-6">check out more quickly • track your orders • register</p>
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