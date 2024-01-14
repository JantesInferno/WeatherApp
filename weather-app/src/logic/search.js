import {GetLocationByName, GetLocationByCoordinates} from './searchService.js';

export const SearchLocation = (locationName) => {

    GetLocationByName(locationName).then(data => {
        console.log(data.results);
    });
}