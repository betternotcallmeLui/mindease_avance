import { useNavigate } from "react-router-dom";

import './Styles/Filter.css'

export const Filter = ({ setSort }) => {
  const navigate = useNavigate();

  const sortRecent = () => {
    setSort("mostRecent");
    navigate("/posts/mostRecent");
  };
  const sortPopular = () => {
    setSort("popular");
    navigate("/posts/popular");
  };
  return (
    <div className='bg-white my-4 h-11 border-2 border-green-400 md:w-[650px] md:mx-auto filter_container'>
      <div className='flex gap-3 filter_container_mini'>
        <div className='cursor-pointer p-2 filter_text' onClick={sortRecent}>
          Reciente
        </div>
        <div onClick={sortPopular} className="cursor-pointer p-2 filter_text">Popular</div>
      </div>
    </div>
  );
};
