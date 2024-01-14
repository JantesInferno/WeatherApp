import { useRef, useState, useEffect } from 'react';
import { LoadAutoComplete } from '../logic/searchService';
import '../styles/headerContainer.css';

export const SearchBar = ({searchButtonClick, searchInput}) => {

    const [input, setInput] = useState({name: ''});
    const [suggestion, setSuggestions] = useState();

    let searchRef = useRef();

    useEffect(() => {
        setInput({name: searchInput.name});
    }, [searchInput]);

    const HandleChange = () => {
        setInput(searchRef.current.value);
        LoadAutoComplete(searchRef.current.value).then(response => {
            let output = response.map((x, i) => {
                return (<button onClick={() => searchButtonClick(`${x.name},${x.region}`)} key={i} className='suggestion'>{x.name}, {x.region}</button>)
            })
            setSuggestions(output);
        })
    }

    return(
        <>
            <div className='searchContainer'>
                <input type='text' className='searchBox' value={input.name} onChange={HandleChange} ref={searchRef} />
                <button className='searchButton' onClick={() => searchButtonClick(searchRef.current.value)}>Sök</button>
            </div>
            <div className='suggestionContainer'>{suggestion}</div>
        </>
    )
}