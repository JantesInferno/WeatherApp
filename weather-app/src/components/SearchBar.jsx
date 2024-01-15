import { useRef, useState, useEffect } from 'react';
import { LoadAutoComplete } from '../logic/searchService';
import '../styles/headerContainer.css';

export const SearchBar = ({searchButtonClick, searchInput}) => {

    const [input, setInput] = useState({name: ''});
    const [suggestion, setSuggestions] = useState('');

    let searchRef = useRef();

    useEffect(() => {
        setInput({name: searchInput.name});
    }, [searchInput]);

    const HandleChange = () => {
        setInput(searchRef.current.value);
        LoadAutoComplete(searchRef.current.value).then(response => {
            let output = response.map((x, i) => {
                return (<button onClick={() => searchButtonClick(`${x.name},${x.region}, ${x.country}`)} key={i} className='suggestion'>{x.name}, {x.region}</button>)
            })
            setSuggestions(output);
        })
    }

    return(
        <>
            <div className='searchContainer'>
                <input type='text' className='searchBox' value={input.name} onChange={HandleChange} ref={searchRef} />
                <div className='searchButton' onClick={() => searchButtonClick(searchRef.current.value)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="searchIcon" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </div>
            </div>
            <div className='suggestionContainer'>{suggestion}</div>
        </>
    )
}