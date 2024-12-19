import React from "react";

const ForecastComp = ({ forecast, location }) => {
    return (
        <div className="container mt-2">
            {/* forecast location */}
            <h4 className="cityname text-light text-center">Forecast Weather of {location.name}, {location.region}, {location.country}.</h4>
            {/* map the forecastday array to the function */}
            {forecast && forecast.forecastday.map((data, index) => {
                // forecast accordian header
                return (<div key={index} className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                <div className="container bg-warning bg-opacity-75 d-flex justify-content-around align-items-center">
                                    <div className="p-2">{data.date}</div>
                                    <div className="p-2">
                                        <img src={data.day.condition.icon} alt="icon" style={{ height: '50px', width: '50px' }} />
                                        <p>{data.day.condition.text}</p>
                                    </div>
                                    <div className="p-2">Min Temp: {data.day.mintemp_c}</div>
                                    <div className="p-2">Max Temp: {data.day.maxtemp_c}</div>
                                </div>
                            </button>
                        </h2>
                        {/* accordian body */}
                        <div id={`${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {data && data.hour.map((data, index) => {
                                    return (
                                        <div key={index} className="container">
                                            <div className="accordianOption d-flex justify-content-center align-items-center">
                                                <h6>{data.time}|</h6>
                                                <h6>{data.temp_c}°C|</h6>
                                                <img src={data.condition.icon} alt='icon' style={{ height: '50px', width: '50px' }} />

                                            </div>
                                            <div className="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar progress-bar-striped" style={{ width: `${data.temp_c}%` }}>{data.temp_c}%</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}


        </div>
    )
}

export default ForecastComp;