import { ItemTODO } from "@/types/ListTodo";

export default function Item(item: ItemTODO) {

  return (
    <div className="flex w-[260px] flex-row py-2 px-5 border-2 border-solid border-[#A9A9A9] rounded-3xl bg-[#F8F8F8] justify-between">
      <div className="flex flex-col w-[80%]">
        <div className="flex flex-row gap-x-1  items-center">
          <div className="w-[20px] h-1 rounded-xl" style={{backgroundColor: "#14F1FF"}}/>
          <p className="text-sm text-[#656262] font-medium">Categoria</p>
        </div>
        <p className="text-lg">{item.title}</p>
        <span className="text-justify">{item.description}</span>
      </div>

      <input type="checkbox" className="w-6 h-6 border-[#FF7550] self-center"/>
    </div>
  );
}