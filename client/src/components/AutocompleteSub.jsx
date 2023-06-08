import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

import './Styles/Autocompletesub.css';

export const AutocompleteSub = ({ refTwo, focus, topic, setSubcategory }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setValue("");
  }, [topic]);

  useEffect(() => {
    const filtredVar = data.filter(
      (option) => option.category?.toLowerCase() === topic.toLowerCase()
    );
    setFiltred(
      filtredVar[0]?.subcategory.filter((element) =>
        element.toLowerCase().includes(value?.toLowerCase())
      )
    );
  }, [data, value, topic]);

  const handleSelect = async (element) => {
    setSubcategory(element);
    setValue(element);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setSubcategory(e.target.value);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`http://localhost:8000/subcategories`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setData(res.data);
  };

  return (
    <div className='relative'>
      <div className='relative flex items-center'>
        <i className='absolute p-2'>
          <BsSearch />
        </i>

        <input
          value={value}
          type='text'
          placeholder='Elige una subcategoría.'
          onChange={handleChange}
          className=' pl-10 flex flex-grow h-9 autocomplete_sub'
          ref={refTwo}
        />
      </div>

      {focus && (
        <ul className='bg-white absolute overflow-auto w-full p-2 z-20 subcategories_menu'>
          {filtred?.map((option, index) => (
            <li
              className='p-2 cursor-pointer subcategories_selection'
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
