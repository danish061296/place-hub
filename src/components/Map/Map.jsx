import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import restaurant from '../PlaceDetails/restaurant.jpg';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles.js';

const Map = ({
  setCoordinates,
  coordinates,
  setBounds,
  places,
  setChildClicked,
  weatherData,
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const classes = useStyles();

  const [isWeatherName, setIsWeatherName] = useState(false);

  return (
    <div className="h-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_APIKEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.length > 0 &&
          places.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {isMobile ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <img
                    alt="map"
                    className={classes.pointer}
                    src={
                      place.photo ? place.photo.images.large.url : restaurant
                    }
                  />
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}

        {weatherData?.list?.map((data, idx) => (
          <div
            className="relative"
            ley={idx}
            lat={data.coord.lat}
            lng={data.coord.lon}
            onMouseEnter={() => setIsWeatherName(true)}
            onMouseLeave={() => setIsWeatherName(false)}
          >
            <img
              style={{ height: '70px' }}
              src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="weather-icon"
            />
            {isWeatherName && (
              <p className="absolute bottom-0 h-4 w-20 text-center text-xs text-white bg-gray-500 rounded-md transform transition duration-500 ">
                {data.weather[0].main}
              </p>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
