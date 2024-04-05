import { CirclePlus } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

export default function ButtonCreate(props: ButtonHTMLAttributes<HTMLButtonElement>){
  return (
    <button 
      {...props}
      className="flex w-[206px] h-8 px-2 py-2 flex-row gap-2 items-center bg-[#FF7550] rounded-lg hover:bg-[#FFA992]">
      <CirclePlus size={24} color="white" />
      <span className='text-xl text-white'>Create List</span>
    </button>
  )
}