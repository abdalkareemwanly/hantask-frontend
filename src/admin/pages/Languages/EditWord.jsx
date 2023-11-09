import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import Allert from "../../Components/Allert";
import WordTable from "./components/WordTable";
import NewWord from "./components/NewWord";

export default function EditWord() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const navigated = useNavigate();

  const [language, setLanguage] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [newWordForm, setNewWordForm] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
      getWords();
  }, [searchWord]);

  const getWords = () => {
       axiosClient.post(`/admin/translation/show/${slug}`, {
        key: searchWord,
       }).then((response)=>{
        setLanguage(response.data.data);
      })
    
  };

  const handleNewWord = () => {
    setNewWordForm(true);
  };

  const handleMessage = (newMessage) => {
    setMessage(newMessage);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleBackToLanguage = () => {
    navigated("/admin/languages");
  };

  const resetJsonFile = () => {
    axiosClient.post("/admin/translation/store", { slug: slug }).then(() => {
      setLanguage([])
      getWords();
    });
  };

  return (
    <div className="flex w-full">
      {message && (
        <div className="w-full h-full bg-[gray] absolute bg-opacity-60 flex justify-start items-start">
          <div className="bg-background-color py-3 border shadow-lg shadow-[gray] w-4/12 opacity-100 mt-10 ms-[25%]">
            <Allert message={message} />
          </div>
        </div>
      )}
      <div className="flex flex-col w-full p-10">
        <h2 className="text-2xl">Change All Words</h2>
        <div className="flex flex-row py-3 gap-3 justify-between">
          <div className="flex flex-row gap-3">
            <button
              className="py-2 px-3 bg-[green] text-[white]"
              onClick={handleNewWord}
            >
              Add New Word
            </button>
            <button
              className="py-2 px-3 bg-[orange] text-[white]"
              onClick={resetJsonFile}
            >
              Regenerate Source Texts
            </button>
          </div>
          <div>
            <button
              className="py-2 px-3 bg-[#204552] text-[white]"
              onClick={handleBackToLanguage}
            >
              All Language
            </button>
          </div>
        </div>
        <div className="flex flex-row py-3 gap-3">
          <span>
            Select any source text to translate it, then enter your translated
            text in the textarea and hit update.
          </span>
        </div>
        <div className="w-full">
          <input
            className="w-full h-10 my-3 border border-[gray] px-3"
            type="text"
            placeholder="Search Source Text..."
            onChange={(ev) => {
              setSearchWord(ev.target.value);
            }}
          />
        </div>
        <div className="border border-[gray]">
          <WordTable slug={slug} newMessage={handleMessage} language={language} />
        </div>
      </div>
      {newWordForm && (
        <div className="w-full h-full bg-[gray] absolute bg-opacity-60 flex justify-start items-start">
          <div className="bg-background-color py-3 border shadow-lg shadow-[gray] w-4/12 opacity-100 mt-10 ms-[25%]">
            <NewWord getWords={getWords} slug={slug} closeForm={() => setNewWordForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
