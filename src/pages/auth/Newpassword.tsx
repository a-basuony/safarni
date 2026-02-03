import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, Check, Eye, EyeOff } from "lucide-react";
import forgetPasswordImage from "@/assets/forgetpassword.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { resetPassword } from "@/services/post";
import type { ResetPasswordPayload } from "@/services/post";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  otp: yup
    .string()
    .length(4, "OTP must be 4 digits")
    .required("OTP Code is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one symbol")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function NewPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: code || "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!email) {
        const emailErr = "Email missing. Please start the reset process again.";
        setError(emailErr);
        toast.error(emailErr);
        return;
      }

      const payload: ResetPasswordPayload = {
        email: email,
        code: data.otp, // Use code from form
        password: data.password,
        password_confirmation: data.confirmPassword,
      };

      const response = await resetPassword(payload);
      console.log("Password reset successful:", response);

      toast.success("Password reset successfully! 🔒");

      // Successfully reset password, now go to Done page
      setTimeout(() => {
        navigate("/done");
      }, 2000);
    } catch (err: any) {
      console.error("Password reset error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValue = watch("password", "");
  const hasMinLength = passwordValue?.length >= 8;
  const hasUpperCase = /[A-Z]/.test(passwordValue || "");
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue || "");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo and Back Button */}
      <div className="flex justify-between items-center px-8 py-6">
        <Link
          to="/login"
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg p-3 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <div></div>
        <img src="/logo.png" alt="Safarni" className="w-20 h-20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-8">
          <div className="bg-gray-100 rounded-3xl p-12 w-full max-w-xl flex items-center justify-center">
            <img
              src={forgetPasswordImage}
              alt="password_Image"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side - New Password Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-sm">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border border-blue-100 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                set new password
              </h1>
              <p className="text-gray-500 text-sm">
                Your New Password Must be Different to Previously Used Password
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("otp")}
                    placeholder="Enter 4-digit code"
                    maxLength={4}
                    className={`w-full px-4 py-3 border ${
                      errors.otp ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.otp.message?.toString()}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="************"
                    className={`w-full px-4 py-3 pl-10 pr-10 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="************"
                    className={`w-full px-4 py-3 pl-10 pr-10 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message?.toString()}
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2">
                  {hasMinLength ? (
                    <Check className="w-4 h-4 text-white bg-green-500 rounded-full p-0.5" />
                  ) : (
                    <Check className="w-4 h-4 text-white bg-gray-300 rounded-full p-0.5" />
                  )}
                  <span
                    className={`text-sm ${
                      hasMinLength ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    Must Be At Least 8 Characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasUpperCase ? (
                    <Check className="w-4 h-4 text-white bg-green-500 rounded-full p-0.5" />
                  ) : (
                    <Check className="w-4 h-4 text-white bg-gray-300 rounded-full p-0.5" />
                  )}
                  <span
                    className={`text-sm ${
                      hasUpperCase ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    Must Contain At Least 1 Uppercase Letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasSpecialChar ? (
                    <Check className="w-4 h-4 text-white bg-green-500 rounded-full p-0.5" />
                  ) : (
                    <Check className="w-4 h-4 text-white bg-gray-300 rounded-full p-0.5" />
                  )}
                  <span
                    className={`text-sm ${
                      hasSpecialChar ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    Must Contain One Special Character
                  </span>
                </div>
              </div>

              {/* Reset Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1b3b82] text-white py-3 rounded-lg font-semibold hover:bg-[#152e66] transition-all disabled:opacity-50 mt-6"
              >
                Reset Password
              </button>

              {/* Back to Login */}
              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back To Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
