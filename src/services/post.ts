import { api } from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const register = async (data: RegisterPayload) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginPayload) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export interface VerifyOtpPayload {
  email: string;
  code: string;
}

export const verifyOtp = async (data: VerifyOtpPayload) => {
  const response = await api.post("/auth/verify", data);
  return response.data;
};

export interface ResetPasswordPayload {
  email: string;
  code: string;
  password: string;
  password_confirmation: string;
}

export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("authToken");

  const response = await api.post("/auth/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = async (data: ForgotPasswordPayload) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export interface VerifyReactivationOtpPayload {
  email: string;
  code: string;
  type: "verification";
}

export const verifyReactivationOtp = async (data: VerifyReactivationOtpPayload) => {
  const response = await api.post("/auth/verify-reset-otp", data);
  return response.data;
};

export interface ResendOtpPayload {
  email: string;
  type: "verification";
}

export const resendOtp = async (data: ResendOtpPayload) => {
  const response = await api.post("/auth/resend-otp", data);
  return response.data;
};
