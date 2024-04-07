'use client'
import React, { useEffect, useState } from "react";
import ButtonCreate from "@/components/Home/ButtonCreate";
import CardCreateList from "@/components/Home/CardCreateList";
import CardList from "@/components/Home/CardList";
import api from "@/lib/axios";
import { Bookmark, CirclePlus } from "lucide-react";
import ModalCategory from "@/components/Home/ModalCategory";
import { DndContext } from "@/context/DndContent";
import { DropResult, Droppable } from "react-beautiful-dnd";
import { ListTodo } from "@/types/ListTodo";

export default function Page() {
  const [inputListTitle, setInputListTitle] = useState<string>("");
  const [showCardCreateList, setShowCardCreateList] = useState<boolean>(false);
  const [showCardCreateCategory, setShowCardCreateCategory] = useState<boolean>(false);
  const [list, setList] = useState<ListTodo[] | []>([]);

  const handleShowCardCreateList = () => {
    setShowCardCreateList(true);
  };

  const handleHideCardCreateList = () => {
    setShowCardCreateList(false);
  };

  //pegar todas as listas do usuário
  const fetchList = async () => {

    try {
      const response = await api.get("/user/list")
        console.log(response.data);
        setList(response.data.lists);
      } catch (error) {
        console.log(error);
      }
  };

  //criar uma lista vazia
  const handleSaveClick = () => {
    try {
      const orderNumber = list.length + 1;
      api.post("/list", { title: inputListTitle, orderNumber })
      .then(() => {
        setShowCardCreateList(false);
        setInputListTitle("");
        fetchList();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteList = (id: string) => {
    try {
      console.log(id)
      api.delete(`/list/${id}`)
      .then(() => {
        fetchList();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeOrderList = async (updatedList: ListTodo) => {
    const body = {
      listTODOId: updatedList.id,
      items: updatedList.ItemTODO.map((item, index) => ({
        itemId: item.id,
        order: index + 1
      }))
    }

    try {
      await api.put("/changelist", body)
        .then(() => {
          console.log("Order changed")
          fetchList();
        })
    } catch (err) {
      console.log(err);
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    let updatedList: ListTodo;

    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
        const newData = [...JSON.parse(JSON.stringify(list))];//shallow copy concept
        const oldDroppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
        const newDroppableIndex = newData.findIndex(x => x.id == destination.droppableId.split("droppable")[1])
        const [item] = newData[oldDroppableIndex].ItemTODO.splice(source.index, 1);
        newData[newDroppableIndex].ItemTODO.splice(destination.index, 0, item);
        setList([...newData]);
        updatedList = newData[newDroppableIndex];
        handleChangeOrderList(updatedList);
    } else {
        const newData = [...JSON.parse(JSON.stringify(list))];//shallow copy concept
        const droppableIndex = newData.findIndex(x => x.id == source.droppableId.split("droppable")[1]);
        const [item] = newData[droppableIndex].ItemTODO.splice(source.index, 1);
        newData[droppableIndex].ItemTODO.splice(destination.index, 0, item);
        setList([...newData]);

        updatedList = newData[droppableIndex];
        handleChangeOrderList(updatedList);
      }
  };


  useEffect(() => {
    fetchList();
  }, [])

  return (
    <main className="p-[84px]">
      <div className="w-full h-full min-h-[850px] border-2 border-[#FF7550] rounded-xl border-solid p-8">
        <h2 className="text-2xl font-semibold text-[#FF7550] mb-6">Minhas Listas</h2>
        <div className="flex flex-row gap-x-5">
          
          <DndContext onDragEnd={onDragEnd}>
            {
              list.map((list, i) => (
                <CardList
                  fetchList={fetchList}
                  list={list} 
                  key={i}
                  handleDeleteList={handleDeleteList}
                />
              ))
            }
          </DndContext>

          {showCardCreateList && (
            <CardCreateList
              setInputListTitle={setInputListTitle}
              inputListTitle={inputListTitle}
              handleHideCardCreateList={handleHideCardCreateList}
              handleSaveClick={handleSaveClick}
            />
          )}
          <div className="flex flex-col gap-2">
            <ButtonCreate 
              text="Create List"
              onClick={handleShowCardCreateList}
              Icon={<CirclePlus size={24} color="white"/>} 
            />
            
            <ButtonCreate 
              text="Create Category"
              Icon={<Bookmark size={24} color="white"/>}
              onClick={() => setShowCardCreateCategory(true)}
            />

            <ModalCategory 
              isOpen={showCardCreateCategory}
              onClose={() => setShowCardCreateCategory(false)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
