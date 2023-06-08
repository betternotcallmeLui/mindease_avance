import { useRef, useState, useEffect } from "react";
import { SideBar } from "./Sidebar";
import { Autocomplete } from "./Autocomplete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateSubcategory = () => {
  const refOne = useRef(null);
  const [topic, setTopic] = useState("");
  const [subcategory, setSubcategory] = useState(false);
  const [focusOne, setFocusOne] = useState(false);
  const [notify, setNotify] = useState("");
  const [showNotify, setShowNotify] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    if (notify) {
      setShowNotify(true);
      timeoutId = setTimeout(() => {
        setShowNotify(false);
      }, 2500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [notify]);

  const handleCloseSearch = (e) => {
    if (!refOne.current.contains(e.target)) {
      setFocusOne(false);
    } else {
      setFocusOne(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setNotify("");
      const res = await axios.post(
        "http://localhost:8000/createSubcategory",
        {
          category: topic,
          subcategory: subcategory,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      await setNotify(res.data.message);
      navigate("/community");
    } catch (error) {
      setNotify(error.response.data.message);
    }
  };

  return (
    <div onClick={handleCloseSearch}>
      {showNotify && (
        <div className='fixed inset-x-0 bottom-0 flex justify-center items-end mb-6 z-50 '>
          <div className='border-2 border-blue-500 py-2 px-5 bg-blue-50 text-lg  '>
            {notify}
          </div>
        </div>
      )}
      <SideBar submitHandler={submitHandler} />
      <div className='pt-20 lg:ml-80 md:w-[650px] md:mx-auto h-full '>
        <h1 className='mb-2 text-lg font-medium'>Crea una subcategoría.</h1>
        <Autocomplete
          focus={focusOne}
          refOne={refOne}
          topic={topic}
          setTopic={setTopic}
        />
        <form className='flex flex-col gap-1' onSubmit={submitHandler}>
          <p className='mt-2'>Nombre de la subcategoría.</p>
          <input
            className='py-1 px-2 hover:border-gray-400 border'
            onChange={(e) => setSubcategory(e.target.value)}
            type='text'
            placeholder=''
            required
          />
          <div className=' flex items-end '>
            <button className='bg-blue-600 text-white  rounded-lg hover:opacity-90 px-2 py-1'>
              Crea una subcategoría.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
