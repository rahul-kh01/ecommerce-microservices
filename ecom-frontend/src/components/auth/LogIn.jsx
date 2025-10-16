import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        console.log("Login Click");
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center p-4">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit(loginHandler)}
                    className="bg-white/80 backdrop-blur-sm shadow-2xl py-10 px-8 rounded-2xl border border-white/20">
                        <div className="flex flex-col items-center justify-center space-y-6 mb-8">
                            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                                <AiOutlineLogin className="text-white text-4xl"/>
                            </div>
                            <h1 className="text-gray-800 text-center font-montserrat text-3xl font-bold">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 text-center">Sign in to your account</p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <InputField
                                label="UserName"
                                required
                                id="username"
                                type="text"
                                message="*UserName is required"
                                placeholder="Enter your username"
                                register={register}
                                errors={errors}
                                />

                            <InputField
                                label="Password"
                                required
                                id="password"
                                type="password"
                                message="*Password is required"
                                placeholder="Enter your password"
                                register={register}
                                errors={errors}
                                />
                        </div>

                        <button
                            disabled={loader}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 flex gap-2 items-center justify-center font-semibold text-white w-full py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] mt-8"
                            type="submit">
                            {loader ? (
                                <>
                                <Spinners /> Loading...
                                </>
                            ) : (
                                <>Sign In</>
                            )}
                        </button>

                        <p className="text-center text-gray-600 mt-8">
                          Don't have an account?
                          <Link
                            className="font-semibold text-blue-600 hover:text-blue-500 ml-1 transition-colors duration-300"
                            to="/register">
                          Sign Up</Link>  
                        </p>
                    </form>
                </div>
            </div>
    );
}

export default LogIn;