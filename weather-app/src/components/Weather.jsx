

export const Weather = ({name, region, data}) => {

    const weekdays = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    let date = new Date(data.date);
    let day = date.getDay();

    return(
        <>
            <div className="weather">
                <div className="weekday">{weekdays[day]}</div>
                <div className="date">{data.date}</div>
                <div className="city">{name}</div>
                <div className="region">{region}</div>
                <img src={data.day.condition.icon} alt="väderbeskrivning"/>
                <div className="desc">{data.day.condition.text}</div>
                <div className="temperature"><div className="max">{data.day.maxtemp_c}°C</div> / <div className="min">{data.day.mintemp_c}°C</div></div>
            </div>
        </>
    )
}