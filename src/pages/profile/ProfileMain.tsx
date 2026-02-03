import { Link } from 'react-router-dom';
import { User, Calendar, Lock, LogOut, ChevronRight, Camera } from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';
import avatarImg from '@/assets/Avatar.png';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { logout as logoutApi } from '@/services/post';
import { uploadProfileImage } from '@/services/profileService';

const ProfileMain: React.FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [avatar, setAvatar] = useState<string>(avatarImg);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const { profile, loading, refetch } = useProfile();
  const { logout } = useAuth();

  const menuItems = useMemo(() => [
    { id: '1', title: 'Personal Info', icon: 'user', path: 'personal-info' },
    { id: '2', title: 'My Booking', icon: 'calendar', path: 'my-booking' },
    { id: '4', title: 'Account & Security', icon: 'lock', path: 'account-security' }
  ], []);

  // تحديث الصورة من الـ API
  useEffect(() => {
    if (profile?.profile_image) {
      setAvatar(profile.profile_image);
    }
  }, [profile]);

  const handleLogoutClick = (): void => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async (): Promise<void> => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout(); 
      setShowLogoutModal(false);
    }
  };

  const handleCancelLogout = (): void => {
    setShowLogoutModal(false);
  };

  const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    user: User,
    calendar: Calendar,
    lock: Lock,
  };

  const getIcon = (iconName: string) => {
    const Icon = ICONS[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(false);

      // Preview image immediately
      if (avatar.startsWith('blob:')) {
        URL.revokeObjectURL(avatar);
      }
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);

      // Upload to server
      // Try Method 1: POST with FormData
      const response = await uploadProfileImage(file);

      if (response.success) {
        setUploadSuccess(true);
        
        // Update the avatar with the server URL
        if (response.data.profile_image) {
          setAvatar(response.data.profile_image);
        }

        // Refetch profile to update all data
        refetch();

        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(error?.response?.data?.message || 'Failed to upload image');
      
      // Revert to original avatar on error
      if (profile?.profile_image) {
        setAvatar(profile.profile_image);
      } else {
        setAvatar(avatarImg);
      }
      
      setTimeout(() => setUploadError(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (avatar.startsWith('blob:')) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Upload Success Message */}
        {uploadSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-poppins">Profile image updated successfully!</span>
          </div>
        )}

        {/* Upload Error Message */}
        {uploadError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-poppins">{uploadError}</span>
          </div>
        )}

        {/* Header البروفايل */}
        <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative rounded-full p-px bg-linear-to-b from-brand-purple to-brand-pink">
                <img 
                  src={avatar}
                  alt={profile?.name || 'User'}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`absolute top-1/2 -right-3 -translate-y-1/2 bg-[#FFFFFFB8] rounded-full p-0.5 shadow-md border border-gray-200 transition-colors ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
                  }`}
                >
                  {isUploading ? (
                    <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Camera className="w-4 h-4 text-brand-purple" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={isUploading}
                />
              </div>

              <div>
                <h2 className="text-xl font-montserrat font-semibold text-[#4B5563] pb-2">
                  {profile?.name || 'Guest'}
                </h2>
                <p className="text-[16px] font-medium font-poppins text-[#6B6E80]">
                  {profile?.email || 'No email'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* القائمة */}
        <div className="rounded-2xl p-px bg-linear-to-b from-brand-purple to-brand-pink">
          <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
            {menuItems.map((item) => (
              <Link 
                key={item.id} 
                to={item.path} 
                className="flex items-center justify-between p-4 mb-3 border border-gray-100 rounded-lg shadow bg-white font-poppins hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#374151]">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[#111928] font-medium">{item.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#374151]" />
              </Link>
            ))}

            <button 
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 p-4 text-red-600 border border-gray-100 rounded-lg shadow bg-white font-normal hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium font-poppins">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-modal-in">
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium font-poppins text-gray-900 text-center mb-4 sm:mb-6">
              Do You Want To Register The Exit Already?
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleConfirmLogout}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 sm:px-6 rounded-lg transition-colors"
              >
                Yes, Log Me Out
              </button>

              <button
                onClick={handleCancelLogout}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 sm:px-6 rounded-lg border border-gray-300 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMain;