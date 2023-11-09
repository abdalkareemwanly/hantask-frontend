
import { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';
import Addlanguage from "./components/Addlanguage";
import LanguageTable from "./components/LanguageTable";
// import { BiX } from "react-icons/bi";


export default function Languages() {
  const [myLanguage, setMyLanguage] = useState([]);
  const [editLanguage, setEditLanguage] = useState(null);
  const [editLanguageForm, setEditLanguageForm] = useState(false);

  useEffect(() => {
    getLanguage();
    getdefaultLanguage()
  }, [])

  const getLanguage = async () => {
    try {
      const response = await axiosClient.get("/admin/languages");
      setMyLanguage(response.data.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const getdefaultLanguage = async () => {
    try {
      await axiosClient.get('/admin/translation');
    } catch (error) {
      console.error("Error fetching default language:", error);
    }
  };

  const getSelectLang = async (id) => {
    try {
      const response = await axiosClient.post(`/admin/language/show/${id}`);
      setEditLanguage(response.data.data);
      setEditLanguageForm(!editLanguageForm);
    } catch (error) {
      console.error("Error fetching selected language:", error);
    }
  };

  return (
    <div className="flex flex-col my-[320px] lg:my-[0px] lg:flex-row gap-5 px-3 items-center justify-center h-full">
      <div className="flex flex-col lg:w-2/3 py-3 border shadow-lg px-12">
        <LanguageTable myLanguage={myLanguage} getLanguage={getLanguage} selectLang={getSelectLang} />
      </div>
      <div className="flex flex-col lg:w-1/3 px-4 py-3 border shadow-lg">
        <Addlanguage getLanguage={getLanguage} />
      </div>
      {editLanguageForm &&
        < div className='w-[100%] h-full bg-[gray] absolute bg-opacity-60 flex justify-start items-start'>
          <div className='bg-background-color p-3 border shadow-lg shadow-[gray] w-4/12 opacity-100 mt-20 ms-[25%]'>
            <Addlanguage getLanguage={getLanguage} editLanguage={editLanguage} closeForm={() => setEditLanguageForm(false)} />
          </div>
        </div>
      }
    </div>
  );
}
