import { useState, useEffect } from 'react';
import FormField from '../../component/FormField';
import { User, Mail, MapPin, Phone } from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';
import { useProfile } from '@/hooks/useProfile';
import { updateProfile } from '@/services/profileService';

const PersonalInfo: React.FC = () => {
  const { profile, loading, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        location: profile.location || '',
        phone: profile.phone || ''
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccessMessage('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile?.name || '',
      email: profile?.email || '',
      location: profile?.location || '',
      phone: profile?.phone || ''
    });
    setError(null);
    setSuccessMessage('');
  };

  const handleUpdate = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage('');

      const response = await updateProfile({
        name: formData.name,
        email: formData.email,
        location: formData.location || null,
        phone: formData.phone || null
      });

      if (response.success) {
        setSuccessMessage('Profile updated successfully!');
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          userData.name = response.data.name;
          userData.email = response.data.email;
          localStorage.setItem('user', JSON.stringify(userData));
        }

        refetch();
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <BackButton to="/profile" />

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-poppins">{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-poppins">{error}</span>
          </div>
        )}

        <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
          <div className="rounded-2xl bg-white p-9">
            <h2 className="font-poppins text-[26px] text-center mb-6">
              Personal Information
            </h2>

            <div className="space-y-6">
              <FormField
                label="Name"
                name="name"
                type="text"
                value={isEditing ? formData.name : (profile?.name || 'N/A')}
                icon={<User className="w-5 h-5 text-gray-400" />}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={isEditing ? formData.email : (profile?.email || 'N/A')}
                icon={<Mail className="w-5 h-5 text-gray-400" />}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />

              <FormField
                label="Location"
                name="location"
                type="text"
                value={isEditing ? formData.location : (profile?.location || 'Not provided')}
                icon={<MapPin className="w-5 h-5 text-gray-400" />}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={isEditing ? formData.phone : (profile?.phone || 'Not provided')}
                icon={<Phone className="w-5 h-5 text-gray-400" />}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />

              <div className="pt-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-linear-to-r from-brand-purple to-brand-pink text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all font-poppins"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-300 transition-all font-poppins"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      disabled={isSaving}
                      className="flex-1 bg-linear-to-r from-brand-purple to-brand-pink text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;