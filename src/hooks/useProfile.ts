import { useState, useEffect } from "react";
import { getProfile, type ProfileData } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await getProfile();
      
      if (response.success) {
        setProfile(response.data);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch profile");
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refetch = () => {
    fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    refetch,
  };
};