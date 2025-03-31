import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));

class Weather extends React.Component {
    state = {
        data: null,
        error: null,
    };

    componentDidMount() {
        const { lat, lng} = this.props;
        const apiKey = '896f1c43c2d2470fa07968989e3e7d64';
        const url = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lat=${lat}&lon=${lng}&lang=pl`;

        fetch(url) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych z API');
                }
                return response.json();
            })
            .then((responseData) => {
                this.setState({ weatherData: responseData.data[0]});
            })
            .catch((error) => {
                this.setState({ error: error.message });
            });
    }

    render() {
        const { weatherData } = this.state;

        if (weatherData) {
            return (
                <div>
                    <h1>Pogoda dla: { weatherData.city_name }</h1>
                    <p>Temperatura:  { weatherData.temp }°C</p>
                    <p>Opis:  { weatherData.weather.description }</p>
                    <p>Wiatr: { weatherData.wind_spd } m/s</p>
                </div>
            );
        }
        return null;
    }

}

root.render(<Weather lat={52.232222} lng={21.008333} />)