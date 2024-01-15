import { Favorite } from './Favorite.jsx';

export const FavoritesList = ({favorites, active, favoriteClick}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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