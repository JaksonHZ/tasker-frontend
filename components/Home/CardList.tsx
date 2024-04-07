import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import Item from './ItemList';
import { ListTodo, ItemTODO } from '@/types/ListTodo';
import { Trash2 } from 'lucide-react';
import ModalTask from './ModalTask';
import api from '@/lib/axios';

interface CardListProps {
  list: ListTodo;
  handleDeleteList: (id: string) => void;
  fetchList: () => void;
}

export default function CardList({ list, handleDeleteList,fetchList }: CardListProps){
  const [showModalTask, setShowModalTask] = useState<boolean>(false);

  return(
    <div className='flex flex-col py-3 px-5 border-2 border-solid border-[#A9A9A9] rounded-3xl items-center gap-y-7 bg-[#F8F8F8]'>

      <ModalTask 
        isOpen={showModalTask} 
        onClose={() => setShowModalTask(false)}
        list={list}
        fetchList={fetchList}
      />

      <h1 className='text-xl font-semibold text-[#656262]'>{list.title}</h1>

      <button 
        type='button'
        className="flex w-[260px] h-8 px-2 py-2 flex-row gap-2 items-center bg-[#F8F8F8] rounded-lg border-2 border-solid border-[#A9a9a9] hover:bg-white"
        onClick={() => setShowModalTask(true)}
      >
        <CirclePlus size={24} color="#656262" />
        <span className='text-xl text-[#656262]'>Create task</span>
      </button>

      {
        list.ItemTODO.map((item, i) => (
          <Item key={i} item={item} fetchList={fetchList} />
        ))
      }

      <div className='w-[260px] h-[1px] bg-black'/>

      <button 
        className="flex w-[260px] h-8 px-2 py-2 flex-row gap-2 items-center bg-[#F8F8F8] rounded-lg border-2 border-solid border-[#A9a9a9] hover:bg-red-600
        text-xl text-[#656262] hover:text-white"
        onClick={() => handleDeleteList(list.id)}
        >
        <Trash2 size={24} color="#656262"/>
        Delete List
      </button>

    </div>
  )
}