import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// components/BackButton.tsx
interface BackButtonProps {
  onClick?: () => void;
  to?: string;
}

 export const BackButton: React.FC<BackButtonProps> = ({ onClick, to = '/profile' }) => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={onClick || (() => navigate(to))}
      className="mb-4 text-gray-600 bg-gray-100 rounded-full p-2"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
};