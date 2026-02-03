import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import loginImage from "@/assets/login.png";
import { ChevronLeft, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyOtp, forgotPassword, resendOtp } from "@/services/post";
import type { VerifyOtpPayload } from "@/services/post";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  otp: yup
    .string()
    .length(4, "Please enter the complete 4-digit code")
    .required("OTP is required"),
});

export default function Otp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success" | null;
    text: string;
  }>({ type: null, text: "" });
  const { login: authLogin } = useAuth();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear any previous messages when user types
    if (message.type) {
      setMessage({ type: null, text: "" });
    }

    // Sync with React Hook Form
    const otpString = newOtp.join("");
    setValue("otp", otpString);
    if (otpString.length === 4) trigger("otp");

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setMessage({ type: null, text: "" });

    try {
      if (!email) {
        const emailErr = "Email not found. Please try registering again.";
        setMessage({ type: "error", text: emailErr });
        toast.error(emailErr);
        return;
      }

      // Handle reactivation flow
      if (type === "reactivation") {
        const payload: VerifyOtpPayload = {
          email: email,
          code: data.otp,
        };

        const response = await verifyOtp(payload);
        console.log("Account reactivation response:", response);

        // Backend returns success message: "Account reactivated successfully. You can now login."
        if (response.success) {
          toast.success(
            response.message ||
              "Your account has been reactivated! Please login to continue.",
          );
          navigate("/login");
        } else {
          throw new Error(response.message || "Verification failed");
        }
        return;
      }

      // Handle regular verification flow
      const payload: VerifyOtpPayload = {
        email: email,
        code: data.otp,
      };

      const response = await verifyOtp(payload);

      if (type === "reset") {
        // Success message for password reset
        setMessage({
          type: "success",
          text: "Code verified successfully! Redirecting to set new password...",
        });
        toast.success("Code verified successfully!");

        // Navigate after showing success message
        setTimeout(() => {
          navigate(
            `/newpassword?email=${encodeURIComponent(
              email,
            )}&code=${encodeURIComponent(data.otp)}`,
          );
        }, 1500);
      } else {
        // Handle registration flow
        const userData = response.data?.user || response.user;
        const token = response.data?.token || response.token;

        setMessage({
          type: "success",
          text: `Welcome ${userData.name}! Logging you in...`,
        });

        // Auto-login after short delay
        setTimeout(() => {
          authLogin({
            name: userData.name,
            email: email,
            token: token,
            avatar: userData.profile_image || userData.avatar,
          });
          toast.success(`Welcome to Safarni, ${userData.name}! ✨`);
        }, 1000);
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Invalid or expired code. Please try again.";
      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);

      // Clear OTP inputs on error
      setOtp(["", "", "", ""]);
      setValue("otp", "");
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || !email) return;

    try {
      setIsLoading(true);
      // Use different endpoint based on type
      if (type === "reactivation") {
        await resendOtp({ email, type: "verification" });
      } else {
        setMessage({ type: null, text: "" });
        await forgotPassword({ email });
      }
      setTimer(60);
      setMessage({
        type: "success",
        text: "A new verification code has been sent to your email!",
      });
      toast.success("New code sent successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: null, text: "" });
      }, 3000);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to resend code. Please try again.";
      setMessage({ type: "error", text: errorMsg });
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Side - Image (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-[#1b3b82] items-center justify-center p-12">
        <div className="max-w-md text-center">
          <img
            src={loginImage}
            alt="OTP Verification"
            className="w-full h-auto mb-8 rounded-2xl shadow-2xl"
          />
          <h2 className="text-3xl font-bold text-white mb-4">Security First</h2>
          <p className="text-blue-100 text-lg">
            We've sent a 4-digit verification code to your email to ensure your
            account remains secure.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            to="/forgot-password"
            className="inline-flex items-center text-gray-600 hover:text-[#1b3b82] mb-8 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            <span>Back to forgot password</span>
          </Link>

          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <Mail className="w-8 h-8 text-[#1b3b82]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {type === "reactivation"
                ? "Reactivate your account"
                : "Verify your email"}
            </h1>
            <p className="text-gray-500">
              {type === "reactivation"
                ? "Please enter the 4-digit code sent to reactivate your account at "
                : "Please enter the 4-digit code sent to "}{" "}
              <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </div>

          {/* Message Alert (Success or Error) */}
          {message.type && (
            <div
              className={`mb-6 p-4 rounded-lg border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
                message.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm flex-1 ${
                  message.type === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <div className="flex justify-between gap-3 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isLoading}
                    className={`w-14 h-16 text-center text-2xl font-bold border-2 rounded-xl focus:border-[#1b3b82] focus:ring-2 focus:ring-[#1b3b82] focus:ring-opacity-20 transition-all bg-gray-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.otp
                        ? "border-red-500"
                        : message.type === "success"
                          ? "border-green-500"
                          : "border-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Validation Error */}
              {errors.otp && (
                <div className="text-center mb-6">
                  <p className="text-red-500 text-sm">
                    {errors.otp.message?.toString()}
                  </p>
                </div>
              )}

              {/* Resend Section */}
              <div className="text-center mb-8">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?{" "}
                  {timer > 0 ? (
                    <span className="text-gray-400 font-medium">
                      Resend in {formatTime(timer)}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isLoading}
                      className="text-[#1b3b82] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Send again
                    </button>
                  )}
                </p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 4}
                className="w-full bg-[#1b3b82] text-white py-3.5 rounded-lg font-semibold hover:bg-[#152e66] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100 hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify Code"
                )}
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Make sure to check your spam folder if you don't see the email in
              your inbox
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
