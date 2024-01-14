
const Favorites = (props) => {
    let favorites = props.favoriteLocations.map((location) => { 
        return(<li>{location}</li>);
    });

    return(
        <>
            <ul>{favorites}</ul>
        </>
    )
}

export default Favorites;