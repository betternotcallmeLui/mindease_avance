import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Search.css';

function Search() {

    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        if (!searchInput) {
            return;
        }
        e.preventDefault();
        navigate(`search/${searchInput}`);
        setSearchInput("");
    };

    return (
        <form onSubmit={submitHandler} className="search_form">
            <input
                type="text"
                value={searchInput}
                placeholder="Buscar"
                onChange={(e) => setSearchInput(e.target.value)}
                className="search_input"
            />
        </form>
    )
}

export default Search