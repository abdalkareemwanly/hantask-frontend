import { useEffect, useState } from 'react'
import axiosClient from '../../../../axios-client';

function LanguageTable() {
    const [myLanguage, setMyLanguage] = useState();

    useEffect(() => {
        getLanguage()
        console.log(myLanguage);
    }, [])

    const getLanguage = () => {
        axiosClient
            .get("/showAllLanguage")
            .then((response) => {
                setMyLanguage(response.data);

            })
            .catch(() => {
                console.log("error");
            });
    };

    return (
        <>
            <h1 className="text-3xl border-b border-[lightgray] py-3">All Languages</h1>
            <table className='text-left my-5'>
                <thead className='border-b border-[gray]'>
                    <tr>
                        <th className='py-1'>ID</th>
                        <th className='py-1'>Name</th>
                        <th className='py-1'>Direction</th>
                        <th className='py-1'>Slug</th>
                        <th className='py-1'>Default</th>
                        <th className='py-1 text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {myLanguage && myLanguage.map((language, index) => (
                        <tr key={index}>
                            <td className='border-b border-[lightgray] py-2 w-[5%]'>{language.id}</td>
                            <td className='border-b border-[lightgray] py-2 w-[25%]'><div className='truncate w-[160px]'>{language.name}</div></td>
                            <td className='border-b border-[lightgray] py-2 w-[10%]'>{language.direction}</td>
                            <td className='border-b border-[lightgray] py-2 w-[10%]'>{language.slug}</td>
                            <td className='border-b border-[lightgray] py-2 w-[15%]'><button className='bg-gray-600 border p-1'>Set As Default</button></td>
                            <td className='border-b border-[lightgray] py-2 w-[35%] text-center space-x-1'>
                                <button className='bg-gray-600 border p-1'>delete</button>
                                <button className='bg-gray-600 border p-1'>Edit Words</button>
                                <button className='bg-gray-600 border p-1'>Edit</button>
                                <button className='bg-gray-600 border p-1'>Copy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default LanguageTable