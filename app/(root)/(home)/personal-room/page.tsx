'use client'

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Table = ({ title, description }: { title: string; description: string; }) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-normal text-sky-1 lg:text-xl xl:min-w-32">{title}:</h1>
    <p className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{description}</p>
  </div>
)

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const client = useStreamVideoClient();
  const { call } = useGetCallById(meetingId!);
  const router = useRouter();

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  }

  return <section className="flex size-full flex-col gap-10 text-white">
    <h1 className="text-3xl font-bold">
      Personal Room
    </h1>

    <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
      <Table title='Topic' description={`${user?.username}'s meeting room`} />
      <Table title='Meeting ID' description={meetingId!} />
      <Table title='Passcode' description="-"/>
      <Table title='Invite Link' description={meetingLink} />
    </div>
    <div className="flex gap-5">
      <Button className="bg-turquoise text-black text-base font-bold px-8 py-6 hover:bg-teal-400" onClick={startRoom}>Start Meeting</Button>
      <Button className="bg-[#252A41] text-sky-1 text-base font-bold px-8 py-6 hover:text-teal-400 flex gap-2 transition duration-300" onClick={() => {
        navigator.clipboard.writeText(meetingLink);
        toast('Link Copied', { className: 'bg-sky-1 text-blue-600 px-5 py-2 rounded text-xl font-medium' })
      }}>
        <Copy />
        Copy Invitation
      </Button>

    </div>
  </section>;
};

export default PersonalRoom;