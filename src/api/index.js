import axios from 'axios';
// test data coming from the APIs
import { placesData } from '../data';
import { weatherData } from '../weatherData';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_TRAVEL_APIKEY,
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      `https://community-open-weather-map.p.rapidapi.com/find`,
      {
        params: { lon: lng, lat: lat },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_WEATHER_APIKEY,
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      }
    );

    return data;
  } catch (e) {
    console.log(e);
  }
};
