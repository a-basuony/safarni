import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { deactivateAccount } from '@/services/profileService';
import { useAuth } from '@/hooks/useAuth';

const DeactivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    setIsPasswordValid(password.trim().length > 0);
  }, [password]);

  const handleDeactivateClick = () => {
    setShowConfirmModal(true);
    setError(null);
  };

  const handleConfirmDeactivate = async () => {
    if (!isPasswordValid) {
      setError('Password is required');
      return;
    }

    try {
      setIsDeactivating(true);
      setError(null);

      const response = await deactivateAccount(password);

      if (response.success) {
        logout();
        navigate('/login');
      } else {
        setError(response.message || 'Failed to deactivate account');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to deactivate account');
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setError(null);
    setPassword('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <BackButton to="/profile/account-security" />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="font-poppins">{error}</span>
          </div>
        )}

        <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
          <div className="rounded-2xl bg-white p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <h1 className="text-2xl font-poppins font-semibold text-center text-gray-900 mb-4">
              Deactivate Account
            </h1>

            <div className="space-y-4 mb-6 text-gray-600 font-poppins">
              <p className="text-center">
                Temporarily deactivating your account will hide your profile and information from other users.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">What happens when you deactivate:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Your profile will be hidden from other users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Your bookings and reservations will remain intact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>You can reactivate your account anytime by logging in</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Your data will be preserved and not deleted</span>
                  </li>
                </ul>
              </div>

              {/* رسالة توضيحية لإعادة التفعيل */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">How to reactivate your account:</h3>
                    <p className="text-sm text-blue-800">
                      Simply login with your email and password. The system will send you an OTP verification code to reactivate your account instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                type="button"
                onClick={() => navigate('/profile/account-security')}
                className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-poppins"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleDeactivateClick}
                className="flex-1 bg-linear-to-b from-brand-purple to-brand-pink text-white font-medium py-3 px-6 rounded-lg  transition-colors font-poppins"
              >
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>

            <h3 className="text-xl font-medium font-poppins text-gray-900 text-center mb-3">
              Are You Sure?
            </h3>

            <p className="text-center text-gray-600 font-poppins mb-4">
              Your account will be temporarily deactivated. You can reactivate it anytime by logging back in.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConfirmDeactivate();
              }}
            >
              <input 
                type="text" 
                name="username"
                value="currentUserEmail@example.com" 
                autoComplete="username" 
                className="hidden" 
                readOnly 
              />

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" 
                  className={`w-full border p-3 rounded-lg ${
                    !isPasswordValid && password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {!isPasswordValid && password && (
                  <p className="text-red-500 text-sm mt-1">Password is required</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isDeactivating}
                  className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isPasswordValid || isDeactivating}
                  className="flex-1 bg-orange-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeactivating ? 'Deactivating...' : 'Yes, Deactivate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeactivateAccount;