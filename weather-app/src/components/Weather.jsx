

export const Weather = ({name, region, data}) => {

    return(
        <>
            <div className="weather">
                <div className="date">{data.date}</div>
                <div className="city">{name}</div>
                <div className="region">{region}</div>
                <img src={data.day.condition.icon} alt="väderbeskrivning"/>
                <div className="temperature"><div className="max">{data.day.maxtemp_c}°C</div> / <div className="min">{data.day.mintemp_c}°C</div></div>
            </div>
        </>
    )
}