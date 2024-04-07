import React, { ButtonHTMLAttributes } from 'react';

interface ButtonCreateProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: React.ReactNode;
  text: string;
}

export default function ButtonCreate({ Icon, text, ...props }: ButtonCreateProps) {
  return (
    <button 
      {...props}
      className="flex w-[206px] h-8 px-2 py-2 flex-row gap-2 items-center bg-[#FF7550] rounded-lg hover:bg-[#FFA992]">
      {Icon}
      <span className='text-xl text-white'>{text}</span>
    </button>
  );
}
