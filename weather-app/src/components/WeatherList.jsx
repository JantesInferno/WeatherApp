import {Weather} from "./Weather";
import '../styles/contentContainer.css';

export const WeatherList = ({data, numberOfDays, detailedWeather, weatherButton}) => {

    if (data.location != undefined) {

        const name = data.location.name;
        const region = data.location.region;
        const forecastDays = data.forecast.forecastday;
        let weatherComponents = [];

        for (let i = 0; i < numberOfDays.value; i++) {
            weatherComponents.push(<Weather 
                name={name} 
                region={region} 
                data={forecastDays[i]} 
            />);
        }

        let buttonText = "Visa 5dygnsprognos";

        if (detailedWeather.active == true) {
            buttonText = "Dölj 5dygnsprognos";
        }

        return(
            <>
                <div className="weatherList">
                    {weatherComponents}
                </div>
                <button className="weatherButton" onClick={weatherButton}>{buttonText}</button>
            </>
        )
    }
}