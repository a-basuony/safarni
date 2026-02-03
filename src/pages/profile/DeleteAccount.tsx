import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, Info, RefreshCw } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { deleteAccount } from '@/services/profileService';
import { useAuth } from '@/hooks/useAuth';

const DeleteAccount: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
    setError(null);
    setConfirmText('');
    setPassword('');
  };

  const handleConfirmDelete = async () => {
    if (confirmText.toLowerCase() !== 'delete') {
      setError('Please type "DELETE" to confirm');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    try {
      setIsDeleting(true);
      setError(null);

      const response = await deleteAccount(password);

      if (response.success) {
        logout();
        navigate('/login');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setError(null);
    setConfirmText('');
    setPassword('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <BackButton to="/profile/account-security" />

        {error && !showConfirmModal && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-poppins">{error}</span>
          </div>
        )}

        <div className="rounded-2xl p-px bg-linear-to-b from-red-500 to-red-600">
          <div className="rounded-2xl bg-white p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-poppins font-semibold text-center text-gray-900 mb-4">
              Delete Account
            </h1>

            <div className="space-y-4 mb-6 text-gray-600 font-poppins">
              <p className="text-center font-semibold text-red-600">
                Warning: This action is permanent and cannot be undone!
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">What happens when you delete:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Your account will be permanently deleted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>All your personal information will be removed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Your booking history will be deleted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>You cannot recover your account after deletion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>You will need to create a new account to use Tripmate again</span>
                  </li>
                </ul>
              </div>

              {/* رسالة توضيحية لإعادة استرجاع الحساب */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Changed your mind?</h3>
                    <p className="text-sm text-green-800">
                      You can restore your deleted account by registering again with the <span className="font-semibold">same email address</span>. The system will automatically restore your account and send you a verification code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">
                      💡 Consider deactivating your account instead if you might want to return later. It's easier and faster to reactivate!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate('/profile/account-security')}
                className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-poppins"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleDeleteClick}
                className="flex-1 bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-poppins"
              >
                Delete My Account
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
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>

            <h3 className="text-xl font-medium font-poppins text-gray-900 text-center mb-3">
              Are You Absolutely Sure?
            </h3>

            <p className="text-center text-gray-600 font-poppins mb-2">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </p>

            {/* معلومة إضافية في الـ Modal */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-800 text-center">
                <span className="font-semibold">Tip:</span> You can restore your account later by registering again with the same email.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                Enter your password to confirm:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-poppins"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
                Type <span className="font-bold text-red-600">DELETE</span> to confirm:
              </label>
              <div className="rounded-2xl p-px bg-linear-to-b from-red-500 to-red-600">
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setError(null);
                  }}
                  placeholder="Type DELETE"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white focus:outline-none font-poppins"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isDeleting}
                className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting || confirmText.toLowerCase() !== 'delete' || !password.trim()}
                className="flex-1 bg-red-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;