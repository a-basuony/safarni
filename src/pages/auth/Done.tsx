import { Link } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import DooneImage from "@/assets/done.png";

export default function Done() {
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
              src={DooneImage}
              alt="done"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Side - Done Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-sm text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#2dc071] rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-8 h-8 text-white stroke-3" />
              </div>
            </div>

            {/* Header Text */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                password reset
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                your password has been successfully reset
                <br />
                click below to log in magically.
              </p>
            </div>

            {/* Login Button */}
            <Link to="/login" className="block w-full">
              <button className="w-full bg-[#1b3b82] text-white py-3 rounded-lg font-semibold hover:bg-[#152e66] transition-all">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}