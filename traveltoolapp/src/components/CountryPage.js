import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CountryPage(props) {
    // Here are the states used in this program
    const [country, setCountry] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [convert, setConvert] = useState(0);
    const [formData, setFormData] = useState({body: '', name: ''});
    const [commentsData, setCommentsData] = useState('loading..');
    const [time, setTime] = useState('');

    
    useEffect(() => { 
        // Gets country info       
        axios.get(`https://restcountries.eu/rest/v2/name/${props.match.params.name}`).then(countryResponse => {
            const country = countryResponse.data[0];
            setCountry(country);
            displayComments();
            makeTime(country);
            // Gets exchange rate information for selected country
            axios.get(`https://api.exchangeratesapi.io/latest?base=USD`).then(currencyResponse => {
                setCurrency(currencyResponse.data.rates[country.currencies[0].code])
            })
        }).catch(() => {
            console.error("failure");
        });
    }, [props.match.params.name]);


    // Converts US dollars to selected country's currency
    function handleChange(event) {
        setConvert(event.target.value * currency);
    }
    
    // Gets discussion info from local Django API
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`http://localhost:8000/comments/`, {...formData, country:props.match.params.name})
            .then(() => {
                displayComments();
            });
    }

    // Gets the current time at selected country
    function makeTime(countryTime) {
        // Gets the UTC time zone
        var tempTime  = countryTime.timezones[0];
        // Gets the current date and time (must be UTC-05:00)
        var currentTime = new Date();
        // Saves the hour from currentTime
        var hours = currentTime.getHours();
        // Gets the UTC hour difference
        tempTime = tempTime.substr(5,2);
        // Makes tempTime an int
        tempTime = parseInt(tempTime);
        // Adds four to temp time to adjust to for eastern time.
        tempTime = tempTime + 4; 
        // Adds to the current hour to get currrent time in the country
        tempTime = hours + tempTime;
        if (tempTime > 23) { // If the addition leads to it being above 23 hours, subtract by 24
            tempTime = tempTime - 24;
        }
        // Gets the current minutes
        var mins = currentTime.getMinutes()
        // Formats the time
        if (mins < 10) {
            tempTime = String(tempTime) + ":0" + String(mins);
        } else {
            tempTime = String(tempTime) + ":" + String(mins);
        }
        // Sets the state
        setTime(tempTime);
    }
    
    // Displays the comments for selected country. Uses Bootstrap for design
    function displayComments() { 
        axios.get(`http://localhost:8000/comments/?countryId=${props.match.params.name}`).then(res => {
            setCommentsData(res.data.map((item => {
                return (
                    <div className="container">
                        <div className="card">
                            <div class="card-header">
                                {item.name}
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                <p>{item.body}</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                )
            })));
        });
    }
    // Centers the flag
    const countryimage = {
        maxWidth: "25vw",
        textAlign: "center"
    }

    // All design created using Bootstrap
    return (
        <React.Fragment>
            {country ? 
            <div>
                <div className="container">
                    <div class="d-flex justify-content-center">
                        <img src={country.flag} alt={country.name} className="img-fluid img-thumbnail" style={countryimage}></img>
                    </div>
                    <h1 className="text-center">{country.name}</h1>
                    <p className="text-center">{country.altSpellings[country.altSpellings.length - 1]}</p>
                    <h2 className="text-center">{time}</h2>
                    <h3 className="text-center">$1 (USD) = {currency} ({country.currencies[0].code})</h3>
                    <h2 className="text-center">Currency conversion</h2>
                    <p className="text-center">{convert}</p>
                    <form><input type="text" onChange={handleChange} className="form-control form-control-sm" placeholder="$$"/></form>
                    
                    <h2 className="text-center">Discussion</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control form-control-sm" placeholder="Name" type="text" 
                        value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value })}/>
                        <input className="form-control form-control-sm" placeholder="Comment" type="text" 
                        value={formData.comment} onChange={(e) => setFormData({...formData, body:e.target.value })}/>
                        <input type="Submit" name="Submit" className="btn btn-dark"/>
                    </form>
                </div>
            </div> 
        
            : <div>loading</div>}
            {commentsData}
        </React.Fragment>
    );
}



export default CountryPage;