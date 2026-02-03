import { Routes, Route } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import MyBooking from './MyBooking';
import AccountSecurity from './AccountSecurity';
import ProfileMain from './ProfileMain';
import DeactivateAccount from './DeactivateAccount';
import DeleteAccount from './DeleteAccount';


const Profile: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProfileMain />} />
      <Route path="personal-info" element={<PersonalInfo />} />
      <Route path="my-booking" element={<MyBooking />} />
      <Route path="account-security" element={<AccountSecurity />} />
        <Route path="account-security/deactivate" element={<DeactivateAccount />} />
      <Route path="account-security/delete" element={<DeleteAccount />} />
    </Routes>
  );
};

export default Profile;
