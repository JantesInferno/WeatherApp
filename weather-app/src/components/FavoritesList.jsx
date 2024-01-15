import { Favorite } from './Favorite.jsx';

export const FavoritesList = ({favorites, active, favoriteClick}) => {

    let favoriteComponents = []

    if (active) {
        for (let i = 0; i < favorites.length; i++) {
            favoriteComponents.push(<Favorite
                favoriteClick={favoriteClick}
                key={i} 
                name={favorites[i]} 
            />);
        }
    }

    return(
        <>
            <div className='favoritesContainer'>
                {favoriteComponents}
            </div>
        </>
    )
}