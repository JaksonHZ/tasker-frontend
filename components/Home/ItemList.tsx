import { ItemTODO } from "@/types/ListTodo";
import { useState } from "react";
import api from "@/lib/axios";

export default function Item(item: ItemTODO) {
  const accessToken = localStorage.getItem("access_token");
  const [done, setDone] = useState<boolean>(item.done);

  const handleCheck = async () => {
    try {
      await api.put(`/item`, { id: item.id, done: !item.done }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(() => {
        setDone(!done);
      });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex w-[260px] flex-row py-2 px-5 border-2 border-solid border-[#A9A9A9] rounded-3xl bg-[#F8F8F8] justify-between">
      <div className="flex flex-col w-[80%]">
        <div className="flex flex-row gap-x-1  items-center">
          <div className="w-[20px] h-1 rounded-xl" style={{backgroundColor: `${item.Category?.color}`}}/>
          <p className="text-sm text-[#656262] font-medium">{item.Category?.name}</p>
        </div>
        <p className="text-lg">{item.title}</p>
        <span className="text-justify">{item.description}</span>
      </div>

      <input type="checkbox" checked={done} onChange={handleCheck} className="w-6 h-6 border-[#FF7550] self-center"/>
    </div>
  );
}