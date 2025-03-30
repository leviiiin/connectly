import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface HomeCardProps {
  icon: string;
  title: string;
  description: string;
  className: string;
  handleClick?: () => void;
}

const HomeCard = ({ icon, title, description, handleClick, className }: HomeCardProps) => {
  return (
    <div
      className={cn('px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[14px] cursor-pointer transition duration-300', className)}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism3 size-12 rounded-[10px]">
        <Image src={icon} width={27} height={27} alt={title} />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-black">{title}</h2>
        <p className="text-lg font-normal text-[#525252]">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
