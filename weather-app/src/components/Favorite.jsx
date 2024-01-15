import { useRef } from "react"

export const Favorite = ({name, favoriteClick}) => {

    let favoriteRef = useRef(); 

    return(
        <>
            <button onClick={() => favoriteClick(favoriteRef.current.value)} ref={favoriteRef} className="favorite" value={name}>{name}</button>
        </>
    )
}