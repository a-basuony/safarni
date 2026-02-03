import { useState } from 'react';
import { changePassword } from '@/services/profileService';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangePassword: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordData.current_password || !passwordData.password || !passwordData.password_confirmation) {
      setError('Please fill in all fields');
      return;
    }

    if (passwordData.password !== passwordData.password_confirmation) {
      setError('New passwords do not match');
      return;
    }

    if (passwordData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      setIsChanging(true);
      setError(null);

      const response = await changePassword(passwordData);

      if (response.success) {
        setSuccessMessage('Password changed successfully!');
        setPasswordData({
          current_password: '',
          password: '',
          password_confirmation: '',
        });

        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2000);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to change password');
    } finally {
      setIsChanging(false);
    }
  };

  const handleClose = () => {
    setPasswordData({
      current_password: '',
      password: '',
      password_confirmation: '',
    });
    setError(null);
    setSuccessMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-xl font-medium font-poppins text-gray-900 mb-6">
          Change Password
        </h3>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* accessibility */}
          <input
            type="text"
            name="username"
            autoComplete="username"
            hidden
            readOnly
          />
                  {/* current_password */}
          <div className="space-y-4">
              <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
            <input
              type="password"
              name="current_password"
              value={passwordData.current_password}
              onChange={handleInputChange}
              autoComplete="current-password"
              placeholder="Current password"
             className="w-full px-4 py-2.5 rounded-2xl bg-white focus:outline-none font-poppins"
            />
              </div>
                 {/* New password */}
          <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
            <input
              type="password"
              name="password"
              value={passwordData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              placeholder="New password"
             className="w-full px-4 py-2.5 rounded-2xl bg-white focus:outline-none font-poppins"
            />
                  </div>
                   {/* Confirm new password*/}
            <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
            <input
              type="password"
              name="password_confirmation"
              value={passwordData.password_confirmation}
              onChange={handleInputChange}
              autoComplete="new-password"
              placeholder="Confirm new password"
             className="w-full px-4 py-2.5 rounded-2xl bg-white focus:outline-none font-poppins"
            />
            </div>
          </div>
                 {/* buttons*/}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isChanging}
              className="flex-1 bg-linear-to-r from-brand-purple to-brand-pink text-white py-3 rounded-lg"
            >
              {isChanging ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
