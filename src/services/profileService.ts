import { api } from "./api";

export interface ProfileData {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  profile_image: string | null;
  role: string;
  is_verified: boolean;
  created_at: string;
}

export interface ProfileResponse {
  success: boolean;
  data: ProfileData;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//updateProfile
export const updateProfile = async (data: Partial<ProfileData>): Promise<ProfileResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await api.put("/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Upload profile image using PUT method (same as update profile)
export const uploadProfileImage = async (file: File): Promise<ProfileResponse> => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();
  formData.append("profile_image", file);

  const response = await api.post("/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    params: {
      _method: 'PUT'
    }
  });

  return response.data;
};


export const uploadProfileImageViaPut = async (file: File): Promise<ProfileResponse> => {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();
  formData.append("profile_image", file);

  const response = await api.put("/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Method 3: Convert to base64 and send as JSON
export const uploadProfileImageAsBase64 = async (file: File): Promise<ProfileResponse> => {
  const token = localStorage.getItem("authToken");

  // Convert file to base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const response = await api.put("/profile", {
    profile_image: base64
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

// Change password
export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePassword = async (data: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await api.put("/profile/password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
// Deactivate Account
export interface DeactivateAccountResponse {
  success: boolean;
  message: string;
}

// Pass the password as parameter
export const deactivateAccount = async (password: string): Promise<DeactivateAccountResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await api.post(
    "/profile/deactivate",
    { password }, // هنا نرسل الباسورد
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// Delete Account
export interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

export const deleteAccount = async (password: string): Promise<DeleteAccountResponse> => {
  const token = localStorage.getItem("authToken");

  const response = await api.delete("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      password, // Send password in request body
    },
  });

  return response.data;
};