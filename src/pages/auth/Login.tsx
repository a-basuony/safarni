import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "@/assets/login.png";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login as loginUser, resendOtp } from "@/services/post";
import type { LoginPayload } from "@/services/post";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

// Validation Schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload: LoginPayload = {
        email: data.email,
        password: data.password,
      };
      const response = await loginUser(payload);
      console.log("Login successful:", response);

      // Handle backend response structure: response.data.user and response.data.token
      const userData = response.data?.user || response.user;
      const token = response.data?.token || response.token;

      // Use AuthContext to save user data - this will auto-redirect to /
      authLogin({
        name: userData.name,
        email: userData.email || data.email,
        token: token,
        avatar: userData.profile_image || userData.avatar, // Handle both field names
      });

      toast.success(`Welcome back, ${userData.name}!`);
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";

      // Check if account is deleted (soft deleted)
      // Backend returns 401 Unauthorized for deleted accounts
      const statusCode = err.response?.status;
      const isDeleted =
        statusCode === 401 &&
        (errorMessage.toLowerCase().includes("deleted") ||
          errorMessage.toLowerCase().includes("not found") ||
          err.response?.data?.status === "deleted");

      if (isDeleted) {
        // Redirect to signup to restore deleted account
        toast.info("Your account was deleted. You can restore it by registering again with the same email address.");
        navigate(`/signup?email=${encodeURIComponent(data.email)}`);
        return;
      }

      // Check if account is deactivated
      // Backend returns 403 Forbidden for deactivated accounts
      const isDeactivated =
        statusCode === 403 ||
        errorMessage.toLowerCase().includes("deactivated") ||
        errorMessage.toLowerCase().includes("inactive") ||
        err.response?.data?.status === "deactivated";

      if (isDeactivated) {
        // Send OTP to user's email for account reactivation
        try {
          await resendOtp({ email: data.email, type: "verification" });
          toast.info("A verification code has been sent to your email. Please enter it to reactivate your account.");
        } catch (otpErr: any) {
          console.error("Failed to send OTP:", otpErr);
          toast.warning("Please check your email for the verification code to reactivate your account.");
        }

        // Redirect to OTP verification for account reactivation
        navigate(`/otp?email=${encodeURIComponent(data.email)}&type=reactivation`);
        return;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const { getGoogleAuthUrl } = await import("@/services/get");
      // The redirect_uri must match exactly what is registered in Google Console
      // and what will be sent in the callback exchange.
      // Using window.location.origin to support both localhost and production.
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const response = await getGoogleAuthUrl(redirectUri);
      // Redirect to Google OAuth URL
      window.location.href = response.url;
    } catch (err: any) {
      console.error("Google login error:", err);
      setError("Failed to initiate Google login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo and Back Button */}
      <div className="flex justify-between items-center px-8 py-6">
        <Link
          to="/GetStarted"
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg p-3 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <div></div>
        <img src="/logo.png" alt="Safarni" className="w-20 h-20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Login Image with Background */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-8">
          <div className="bg-gray-100 rounded-3xl p-12 w-full max-w-xl flex items-center justify-center">
            <img
              src={loginImage}
              alt="login"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-sm">
            {/* Welcome Text */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome Again
              </h1>
              <p className="text-gray-600 text-sm">
                welcome back! please fill your Data
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="kneeDue@untitledui.com"
                  className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="••••••••••"
                    className={`w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 mt-8"
              >
                Log In
              </button>

              {/* Divider */}
              <div className="relative flex items-center my-8">
                <div className="grow border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500 font-medium">
                  or
                </span>
                <div className="grow border-t border-gray-300"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-16 h-16 border-2 border-blue-400 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-10">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
