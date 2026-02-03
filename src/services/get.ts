import { api } from "./api";

export interface GoogleAuthResponse {
  success: boolean;
  url: string;
}

export const getGoogleAuthUrl = async (redirectUri: string): Promise<GoogleAuthResponse> => {
  const response = await api.get(`/auth/google?redirect_uri=${redirectUri}`);
  return response.data;
};

export const googleAuthCallback = async (code: string, redirectUri: string) => {
  const response = await api.get(
    `/auth/google/callback?code=${code}&redirect_uri=${redirectUri}`
  );
  return response.data;
};
