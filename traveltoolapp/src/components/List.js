import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

// List of countries for demo version
const countries = ["39", "49", "86", "90"];

// Gets country info for the list
function List() {
    const [flags, setFlags] = useState(null);
    React.useEffect(() => {
        const fetchFlags = async() => {
            // Gets info from RESTCountries API
            const flagResponses = await Promise.all(
                countries.map(country => axios.get(`https://restcountries.eu/rest/v2/callingcode/${country}`))
            ).catch(error => console.log(error));
            // Maps through and saves the data to flags
            const flags = flagResponses.map(flagResponse => flagResponse.data[0]);
            setFlags(flags);
        };
        fetchFlags();
    }, [countries]);

    return (
        // Cards created using bootstrap https://getbootstrap.com/docs/4.0/components/card/
        <React.Fragment>
            <div className="container">
                <h3 className="text-center">Travel Tool</h3>
            {flags ? flags.map(flag => (
            <div>
                <div className = "row d-flex justify-content-center">
                    <div className = "col-6 card" style={{margin:"5vh 0px"}}>
                        <img className="card-img-top" src={flag.flag} alt="flag of italy"></img>
                        <div className="card-body">
                            <h5 className="card-title">{flag.name}</h5>
                            <p className="card-text">Come visit {flag.name}! Click info to learn more</p>
                            <NavLink to={`/${flag.name}`} className="btn btn-primary">Info</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            )) : null}          
            </div>
        </React.Fragment>
    );
}

export default List;