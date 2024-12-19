import React from "react";

const CurrentComp = ({ current, location }) => {
    return (
        <div className="container mt-2">
            {/* weather location */}
            <h4 className="cityname text-light text-center">Current Weather of {location.name}, {location.region}, {location.country}.</h4>
            {/* weather row */}
            <div className="container-fluid mt-3">
                <div className="row">
                    {/* weather row col-1 */}
                    <div className="col-lg-6 mt-2">
                        <div className="card h-100 bg-light bg-opacity-10 text-light">
                            <div className="card-body d-flex flex-column align-items-start justify-content-center">
                                {/* weather row{row col-1} */}
                                <div className="row">
                                    <div className="col-6">
                                        <h2>Now</h2>
                                        <h1 style={{ fontSize: '45px' }}> {current.temp_c}°</h1>
                                        <h6>Feels like {current.feelslike_c}°</h6>
                                    </div>
                                    {/* weather row{row col-2} */}
                                    <div className="col-6">
                                        <img src={current.condition.icon} className="card-img-top" alt="icon" style={{ height: '150px', width: '150px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* weather row col-2 */}
                    <div className="col-lg-6 mt-2">
                        <div className="card bg-light h-100 bg-opacity-10 text-light ">
                            <div className="card-body d-flex flex-column align-items-end justify-content-center">
                                <h2>{current.condition.text}</h2>
                                <p>Humidity: {current.humidity}%</p>
                                <p>Wind Speed: {current.wind_kph}kph</p>
                                <p>Precipitation: {current.precip_mm}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CurrentComp;