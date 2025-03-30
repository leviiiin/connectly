import { cn } from "@/lib/utils";
import { CallControls, CallingState, CallParticipantsList, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false)
  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }

  return <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
    <div className="relative flex size-full items-center justify-center">
      <div className="flex size-full max-w-[1000px] items-center">
        <CallLayout />
      </div>
      <div className={cn("h-[calc(100vh-86px)] hidden ml-2", { 'show-block': showParticipants })}>
        <CallParticipantsList onClose={() => setShowParticipants(false)} />
      </div>
    </div>
    <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 gap-y-0 flex-wrap pb-2 sm:gap-y-0 sm:gap-5 sm:pb-0">
      <CallControls onLeave={() => {router.push('/')}} />

      <DropdownMenu onOpenChange={setOpenDropdownMenu}>
        <div className="flex items-center">
          <DropdownMenuTrigger className={`py-2 px-2 rounded-full transition-colors hover:bg-[#323B44] ${openDropdownMenu ? "bg-turquoise" : "bg-[#19232d]"
            }`}>
            <LayoutList
              size={20}
              className={`text-white transition-transform ${openDropdownMenu ? "text-dark-1" : "text-white"
                }`}
            />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="border-[#19232d] bg-[#19232d] text-white px-3 py-3 rounded-2xl flex flex-col gap-[1px]">
          {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => {
            const isSelected = layout === item.toLowerCase();
            return (
              <div key={index}>
                <DropdownMenuItem
                  className={cn(
                    "cursor-pointer rounded-full px-3 font-medium transition-colors",
                    isSelected ? "bg-turquoise text-dark-1" : "hover:bg-[#d4d4d8] hover:text-[#565761]"
                  )}
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                >
                  {item}
                </DropdownMenuItem>
              </div>
            );
          })}
        </DropdownMenuContent>

      </DropdownMenu>
      <button onClick={() => setShowParticipants((prev) => !prev)} className={cn('bg-[#19232d] py-2 px-2 rounded-full hover:bg-[#323B44]', { 'bg-turquoise text-dark-2 hover:bg-turquoise': showParticipants })}>
        <Users size={20} className={cn('text-white', { 'text-dark-2': showParticipants })} />
      </button>
      {!isPersonalRoom && <EndCallButton />}
    </div>
  </section>;
};

export default MeetingRoom;
