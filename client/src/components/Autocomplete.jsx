import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

export const Autocomplete = ({ focus, topic, setTopic, refOne }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFiltred(
      data.filter((option) =>
        option.category.toLowerCase().includes(value?.toLowerCase())
      )
    );
  }, [data, value, topic]);

  const handleSelect = async (element) => {
    setTopic(element);
    setValue(element);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setTopic(e.target.value);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`http://localhost:8000/categories`, {
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
          placeholder='Elige una categoría'
          onChange={handleChange}
          className=' pl-10 flex flex-grow h-9 autocomplete_sub'
          ref={refOne}
        />
      </div>

      {focus && (
        <ul className='bg-white absolute overflow-auto w-full p-2 z-10 subcategories_menu'>
          {filtred?.map((option) => (
            <li
              className='p-2 cursor-pointer subcategories_selection'
              key={option._id}
              onClick={() => handleSelect(option.category)}
            >
              {option.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
