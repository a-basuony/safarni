import { Search, SlidersHorizontal, LogOut } from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { logout as logoutApi } from "@/services/post";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutApi(); // Call backend logout
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout(); // Clear local state and redirect
    }
  };
 //navigation to profile page
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length >= 2)
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="bg-white mb-5 w-[90%] mx-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-20 h-20">
              <img className="w-full h-full" src="/logo.png" alt="logo" />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-[20px] font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/favorite"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600 transition"
              }
            >
              Favorite
            </NavLink>
            <Link to="#" className="hover:text-blue-600 transition">
              Compare
            </Link>
            <Link
              to="/flight-booking"
              className="hover:text-blue-600 transition"
            >
              Flight Booking
            </Link>
            <Link to="/map" className="hover:text-blue-600 transition">
              Maps
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 rounded-full transition"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Avatar */}
            <button className="relative group"  onClick={() => navigate("/profile")}>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden ring-2 ring-blue-100 group-hover:ring-blue-400 transition shadow-sm">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        target.style.display = "none";
                        const span = document.createElement("span");
                        span.className =
                          "text-white font-bold text-sm select-none";
                        span.innerText = getInitials(user?.name || "");
                        parent.appendChild(span);
                      }
                    }}
                  />
                ) : (
                  <span className="text-white font-bold text-sm select-none">
                    {getInitials(user?.name || "Guest")}
                  </span>
                )}
              </div>
              {user?.name && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                  {user.name}
                </span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-full transition group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <div className="md:hidden w-full mt-4 bg-white shadow-lg rounded-xl border border-gray-100">
            <div className="flex justify-around items-center py-4">
              <NavLink
                to="/"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold text-lg"
                    : "text-gray-700 font-medium text-lg hover:text-blue-600"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/favorite"
                onClick={() => setOpenMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold text-lg"
                    : "text-gray-700 font-medium text-lg hover:text-blue-600"
                }
              >
                Favorite
              </NavLink>
              <Link
                to="#"
                onClick={() => setOpenMenu(false)}
                className="text-gray-700 font-medium text-lg hover:text-blue-600"
              >
                Compare
              </Link>
              <Link
                to="/flight-booking"
                onClick={() => setOpenMenu(false)}
                className="text-gray-700 font-medium text-lg hover:text-blue-600"
              >
                Flight Booking
              </Link>
              <Link
                to="/map"
                onClick={() => setOpenMenu(false)}
                className="text-gray-700 font-medium text-lg hover:text-blue-600"
              >
                Maps
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
