'use client'
import React, { useEffect, useState } from "react";
import ButtonCreate from "@/components/Home/ButtonCreate";
import CardCreateList from "@/components/Home/CardCreateList";
import CardList from "@/components/Home/CardList";
import api from "@/lib/axios";
import { Bookmark, CirclePlus } from "lucide-react";
import ModalCategory from "@/components/Home/ModalCategory";

export default function Page() {
  const [inputListTitle, setInputListTitle] = useState<string>("");
  const [showCardCreateList, setShowCardCreateList] = useState<boolean>(false);
  const [showCardCreateCategory, setShowCardCreateCategory] = useState<boolean>(false);
  const [list, setList] = useState([]);

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


  useEffect(() => {
    fetchList();
  }, [])

  return (
    <main className="p-[84px]">
      <div className="w-full h-full min-h-[850px] border-2 border-[#FF7550] rounded-xl border-solid p-8">
        <h2 className="text-2xl font-semibold text-[#FF7550] mb-6">Minhas Listas</h2>
        <div className="flex flex-row gap-x-5">
          {
            list.map((list, i) => (
              <CardList
                fetchList={fetchList}
                key={i} 
                list={list} 
                handleDeleteList={handleDeleteList}
              />
            ))
          }
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
