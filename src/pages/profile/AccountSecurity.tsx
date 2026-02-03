import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components/ui/BackButton';
import ChangePassword from '@/pages/profile/changePassword';
import { useProfile } from '@/hooks/useProfile';

const AccountSecurity: React.FC = () => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { loading } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-poppins">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <BackButton to="/profile" />

        <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink max-w-6xl">
          <div className="rounded-2xl bg-white p-6 space-y-4">
            <h1 className="text-2xl text-center font-poppins mb-6">
              Account & Security
            </h1>

            {/* Change Password */}
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center justify-between py-2 bg-white border border-transparent shadow rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="text-left p-1">
                <h3 className="text-base font-medium text-gray-900 font-poppins">
                  Change Password
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-poppins">
                  Update your password to keep your account secure.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
            </button>

            {/* Deactivate Account */}
            <button
              type="button"
              onClick={() => navigate('/profile/account-security/deactivate')}
              className="w-full flex items-center justify-between py-2 bg-white border border-transparent shadow rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="text-left p-1">
                <h3 className="text-base font-medium text-gray-900 font-poppins">
                  Deactivate Account
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-poppins">
                  Temporarily deactivate your account. Easily reactivate when you're ready.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
            </button>

            {/* Delete Account */}
            <button
              type="button"
              onClick={() => navigate('/profile/account-security/delete')}
              className="w-full flex items-center justify-between py-2 bg-white border border-transparent shadow rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="text-left p-1">
                <h3 className="text-base font-medium text-red-600 font-poppins">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-poppins">
                  Permanently remove your account and data from Tripmate. Proceed with caution.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePassword
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default AccountSecurity;