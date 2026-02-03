import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import startedImg from "@/assets/started.png";

const GetStarted: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col px-6 py-5">
      {/* logo - restored to original top-right position */}
      <div className="w-full flex justify-end items-center">
        <img className="m-10 mr-20" src="/logo.png" alt="logo" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* left: illustration card */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-205 rounded-2xl p-6">
              <div className="flex items-center justify-center">
                <img
                  src={startedImg}
                  alt="started"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
            </div>
          </div>

          {/* right: content */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* logo top-right on large screens */}
            <div className="w-full max-w-md text-center">
              <h1 className="text-4xl font-semibold text-foreground mb-4">
                Welcome
              </h1>
              <p className="text-base text-gray-800 mb-8">
                Safarni is your all-in-one travel guide. Discover destinations,
                compare trip prices, book flights, hotels, car rentals, and
                local tours — all through one interactive experience.
              </p>

              <div className="space-y-3">
                <Link to="/signup" className="block">
                  <Button
                    className="w-full bg-[#23479b] text-white hover:bg-[#1b3b82] shadow-none rounded-md py-3"
                    size="lg"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full border border-[#23479b] text-[#23479b] hover:bg-white shadow-none rounded-md py-3"
                    size="lg"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;