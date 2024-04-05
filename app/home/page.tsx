'use client'
import React, { useState } from "react";
import ButtonCreate from "@/components/Home/ButtonCreate";
import CardCreateList from "@/components/Home/CardCreateList";

export default function Page() {
  const [inputListTitle, setInputListTitle] = useState<string>("");
  const [showCardCreateList, setShowCardCreateList] = useState<boolean>(false);

  const handleShowCardCreateList = () => {
    setShowCardCreateList(true);
  };

  const handleHideCardCreateList = () => {
    setShowCardCreateList(false);
  };

  const handleSaveClick = () => {
    console.log(inputListTitle);
  };

  return (
    <main className="p-[84px]">
      <div className="w-full h-full min-h-[850px] border-2 border-[#FF7550] rounded-xl border-solid p-8">
        <h2 className="text-2xl font-semibold text-[#FF7550] mb-6">Minhas Listas</h2>
        <div className="flex flex-row gap-x-5">
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
