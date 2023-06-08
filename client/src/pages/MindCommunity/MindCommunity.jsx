import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

import { Posts } from "../../components/Posts";
import { SideBar } from "../../components/Sidebar";

import './MindCommunity.css';

export const MindCommunity = ({ isLoggedIn, modal, setModal, sort, setSort }) => {

    const username = localStorage.getItem("username");

    return (
        <>
            <SideBar />
            <div className="me_community">
                <div className="community">
                    <div className="community_container">
                        {username && (
                            <Link to='/createPost'>
                                <div className='flex h-11 bg-white  border-2 border-gray-200 md:w-[650px] md:m-auto'>
                                    <i className='flex justify-center items-center p-3'>
                                        <BsPlusLg />
                                    </i>
                                    <input
                                        type='text'
                                        placeholder='Crea un nuevo post.'
                                        className='hover:border-blue-300 bg-gray-50 border-2 border-gray-200 w-full mr-4 my-1 px-3 py-1'
                                    />
                                </div>
                            </Link>
                        )}

                        <Posts
                            isLoggedIn={isLoggedIn}
                            modal={modal}
                            setModal={setModal}
                            sort={sort}
                            setSort={setSort}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
