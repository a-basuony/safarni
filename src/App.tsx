import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./pages/profile";
import GetStarted from "./pages/auth/GetStarted";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Otp from "./pages/auth/Otp";
import NewPassword from "./pages/auth/Newpassword";
import Done from "./pages/auth/Done";
import GoogleCallback from "./pages/auth/GoogleCallback";

// Pages from Deployment branch
import CarsBooking from "@/pages/CarBooking/CarsBooking";
import CarDetails from "@/pages/CarBooking/CarDetails";
import Favorite from "@/pages/Favorite/Favorite";
import CarsMap from "@/pages/CarBooking/Map/CarsMap";

// Additional components
import Map from "@/component/map/Map";
import Home from "./pages/HOME-PAGE/Home";
import CityDetails from "./pages/SEARCH-PAGE/CityDetails";
import FilterPanel from "./pages/SEARCH-PAGE/FilterPanel";
import SearchPage from "./pages/SEARCH-PAGE/SearchPage";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute, PublicRoute } from "./component/ProtectedRoute";
import Navbar from "./component/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlightBookingFlow } from "./pages/FlightBookingFlow";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  // Auth routes where Navbar should be hidden
  const authRoutes = [
    "/GetStarted",
    "/login",
    "/signup",
    "/forgot-password",
    "/otp",
    "/newpassword",
    "/newpassword",
    "/done",
    "/auth/google/callback",
  ];

  const isAuthRoute = authRoutes.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {!isAuthRoute && <Navbar />}

        <Routes>
          {/* Public Auth Routes */}
          <Route
            path="/GetStarted"
            element={
              <PublicRoute>
                <GetStarted />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <PublicRoute>
                <Otp />
              </PublicRoute>
            }
          />
          <Route
            path="/newpassword"
            element={
              <PublicRoute>
                <NewPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/google/callback"
            element={
              <PublicRoute>
                <GoogleCallback />
              </PublicRoute>
            }
          />
          <Route
            path="/done"
            element={
              <PublicRoute>
                <Done />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarsBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car-details"
            element={
              <ProtectedRoute>
                <CarDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/flight-booking"
            element={
              <ProtectedRoute>
                <FlightBookingFlow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <Map />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cars-location"
            element={
              <ProtectedRoute>
                <CarsMap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cite/:id"
            element={
              <ProtectedRoute>
                <CityDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FilterPanel"
            element={
              <ProtectedRoute>
                <FilterPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
