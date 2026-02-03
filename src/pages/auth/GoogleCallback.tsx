import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { googleAuthCallback } from "@/services/get";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const processedRef = useRef(false);

  useEffect(() => {
    // Prevent double execution in React Strict Mode which might invalidate the code
    if (processedRef.current) return;

    const exchangeCodeForToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");

      if (!code) {
        // If no code, check for error param or just fail
        const error = params.get("error");
        if (error) {
          toast.error(`Google Login Error: ${error}`);
        } else {
          toast.error("No authentication code received from Google.");
        }
        navigate("/login", { replace: true });
        return;
      }

      processedRef.current = true;

      try {
        // Must match the redirect_uri sent in the initial request
        const redirectUri = `${window.location.origin}/auth/google/callback`;
        const result = await googleAuthCallback(code, redirectUri);

        if (result.success && result.data) {
          const { token, user } = result.data;

          // Construct user data for context
          const userData = {
            token,
            name: user.name || "User",
            email: user.email || "",
            avatar: user.avatar || user.profile_image || user.picture,
            ...user, // Spread other fields just in case
          };

          login(userData);
          toast.success(`Welcome ${userData.name}!`);
          navigate("/", { replace: true });
        } else {
          throw new Error(result.message || "Authentication failed");
        }
      } catch (error: any) {
        console.error("Google Auth Error:", error);
        toast.error(error.message || "Failed to complete Google Login");
        navigate("/login", { replace: true });
      }
    };

    exchangeCodeForToken();
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Authenticating...
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your secure login.
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
