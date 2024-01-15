import { Weather } from "./Weather";
import '../styles/contentContainer.css';

export const WeatherList = ({data, numberOfDays, listWeather, weatherListButton}) => {

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
                key={i}
            />);
        }

        let buttonTextDays = "Visa 5-dygnsprognos";

        if (listWeather.active) {
            buttonTextDays = "Dölj 5-dygnsprognos";
        }

        return(
            <>
                <div className="weatherList">
                    {weatherComponents}
                </div>
                <button className="weatherButtonList" onClick={weatherListButton}>{buttonTextDays}</button>
            </>
        )
    }
}