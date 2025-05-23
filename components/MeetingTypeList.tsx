"use client"

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner"
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const CreateMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.warning("Please select a date and time");
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id)

      if (!call) throw new Error('Failed to create call');

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast.success("Meeting Created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting");
    }
  }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 text-black">
    <HomeCard
      icon="/icons/add-meeting.svg"
      title="New Meeting"
      description="Setup a new recording"
      handleClick={() => setMeetingState('isInstantMeeting')}
      className="bg-lime-400 hover:bg-lime-300" />
    <HomeCard
      icon="/icons/join-meeting.svg"
      title="Join Meeting"
      description="Via invitation link"
      handleClick={() => setMeetingState('isJoiningMeeting')}
      className="bg-cyan-300 hover:bg-cyan-200" />
    <HomeCard
      icon="/icons/schedule.svg"
      title="Schedule Meeting"
      description="Plan your meeting"
      handleClick={() => setMeetingState('isScheduleMeeting')}
      className="bg-indigo-400 hover:bg-indigo-300" />
    <HomeCard
      icon="/icons/recordings.svg"
      title="View Recordings"
      description="Meeting recordings"
      handleClick={() => router.push('/recordings')}
      className="bg-amber-400 hover:bg-amber-300" />

    {!callDetails ? (
      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={CreateMeeting}
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base font-normal leading-[22px] text-sky-1">
            Add a description
          </label>
          <Textarea
            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              setValues({ ...values, description: e.target.value })
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label className="text-base font-normal leading-[22px] text-sky-1">
            Select Date and Time
          </label>
          <DatePicker
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            className="bg-dark-3 px-4 py-2 text-sky-1 rounded-md"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </MeetingModal>
    ) : (
      <MeetingModal
        isOpen={meetingState === 'isScheduleMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        className='text-center'
        handleClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast('Link copied', { className: 'bg-sky-1 text-blue-600 px-5 py-2 rounded text-xl font-medium' });
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
        buttonText="Copy Meeting Link"
      />
    )}

    <MeetingModal
      isOpen={meetingState === 'isInstantMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Start an Instant Meeting"
      className='text-center'
      buttonText="Start Meeting"
      handleClick={CreateMeeting}
    />

    <MeetingModal
      isOpen={meetingState === 'isJoiningMeeting'}
      onClose={() => setMeetingState(undefined)}
      title="Type the link here"
      className='text-center'
      buttonText="Start Meeting"
      handleClick={() => router.push(values.link)}
    >
      <Input
        placeholder="Meeting link"
        className="border-none bg-dark-3 text-sky-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => setValues({ ...values, link: e.target.value })}
      />
    </MeetingModal>
  </section>;
};

export default MeetingTypeList;
