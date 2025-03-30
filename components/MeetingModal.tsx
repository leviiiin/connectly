import React, { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  buttonIcon?: string;
  image?: string;
}

const MeetingModal = ({ isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon }: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[275px] sm:max-w-[420px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white rounded-xl">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h3 className={cn('text-2xl font-bold leading-[42px]', className)}>{title}</h3>
          {children}
          <Button className="bg-turquoise hover:bg-[#3FFFDA] transition duration-300 text-black font-bold focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
            {buttonIcon &&(
              <Image src={buttonIcon} alt="icon" width={13} height={13} />
            )} &nbsp;
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default MeetingModal;
