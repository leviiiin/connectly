'use client'

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error('usecall must be used within StreamCall component');
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);


  return <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
    <h1 className="text-2xl font-bold">Setup</h1>
    <VideoPreview className="h-[160px] w-[280px] sm:w-[400px] sm:h-[230px] lg:w-[700px] lg:h-[400px] flex justify-center items-center" />
    <div className="flex h-16 items-center justify-center gap-3">
      <label className="flex items-center justify-center gap-2 font-medium cursor-pointer">
        <input
          type="checkbox"
          checked={isMicCamToggleOn}
          onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-turquoise checked:border-slate-800"
        />
        Join with mic and camera off
      </label>
      <DeviceSettings />
    </div>
    <Button
      className="rounded-md bg-turquoise text-black font-bold px-5 py-2.5 hover:bg-teal-400"
      onClick={() => {
        call.join();
        setIsSetupComplete(true);
      }}>
      Join meeting
    </Button>
  </div>;
};

export default MeetingSetup;
