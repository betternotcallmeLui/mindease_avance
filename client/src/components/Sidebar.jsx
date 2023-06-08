import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import axios from "axios";

import './Styles/Sidebar.css'

export const SideBar = ({ submitHandler }) => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTopics();
  }, [submitHandler]);

  const fetchTopics = async () => {
    const res = await axios.get("http://localhost:8000/categories");
    setTopics(res.data);
  };

  const Topic = ({ data, level }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggle = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div key={data._id}>
        {data.subcategory && data.subcategory.length > 0 ? (
          <div onClick={toggle} className='flex items-end mb-2'>
            <p className='text-lg min-w-[100px] cursor-pointer'>
              {data.category}
            </p>
            <i className='text-2xl cursor-pointer  '>
              {isExpanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </i>
          </div>
        ) : (
          <span>{data.category}</span>
        )}
        {isExpanded &&
          data.subcategory?.map((child, index) => (
            <div
              key={index}
              className='mb-2 cursor-pointer hover:bg-gray-200 border-r-4 border-white p-1'
              onClick={() => navigate(`/${child}`)}
              style={{ marginLeft: `${level * 20}px` }}
            >
              {child}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className='lg:overflow-auto hidden lg:block lg:w-56 pt-6 pl-4 pb-10  mt-10 fixed h-full sidebar_container'>
      {token && (
        <div className='flex items-center gap-1 mb-2 p-1 create-subcategory'>
          <i className=''>
            <BsPlusLg />
          </i>
          <button onClick={() => navigate("/createSubcategory")}>
            Crear subcategoría
          </button>
        </div>
      )}
      <h1 className='mb-2 mt-3 category_text'>Categorías:</h1>
      {topics.map((data) => (
        <Topic key={data._id} data={data} level={1} />
      ))}
    </div>
  );
};
