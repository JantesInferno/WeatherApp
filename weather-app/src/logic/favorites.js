
const SetFavorites = (location) => {
    let favorites = GetFavorites();

    favorites.push(location);

    localStorage.setItem('locations', favorites);
}

const GetFavorites = () => {
    return localStorage.getItem('locations');
}