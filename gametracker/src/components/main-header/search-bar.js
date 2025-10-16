'use client';

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [searchBar, setSearchBar] = useState('');
    const router = useRouter();

    function handleOnChange(event) {
        setSearchBar(event.target.value);
    }
    function handleOnSubmit(event) {
        event.preventDefault();
        router.push(`/search-bar?query=${encodeURIComponent(searchBar)}`);    
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleOnSubmit}>
            <input type='text' name="search" placeholder="Buscar Jogos..." value={searchBar} onChange={handleOnChange} className="px-3 py-1 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none" /> 
        </form>
    )
}