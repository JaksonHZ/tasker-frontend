'use client'
import React, { useEffect, useState } from "react";
import ButtonCreate from "@/components/Home/ButtonCreate";
import CardCreateList from "@/components/Home/CardCreateList";
import CardList from "@/components/Home/CardList";
import api from "@/lib/axios";

export default function Page() {
  const [inputListTitle, setInputListTitle] = useState<string>("");
  const [showCardCreateList, setShowCardCreateList] = useState<boolean>(false);
  const [list, setList] = useState([]);
  const accessToken = localStorage.getItem("access_token");

  const handleShowCardCreateList = () => {
    setShowCardCreateList(true);
  };

  const handleHideCardCreateList = () => {
    setShowCardCreateList(false);
  };

  //pegar todas as listas do usuário
  const fetchList = async () => {

    try {
      const response = await api.get("/user/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }})
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
      api.post("/list", { title: inputListTitle, orderNumber }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(() => {
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
      api.delete(`/list/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(() => {
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
          <ButtonCreate onClick={handleShowCardCreateList} />
        </div>
      </div>
    </main>
  );
}
