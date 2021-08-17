import React, { useState, useEffect, createRef } from 'react';
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  Grid,
  Select,
} from '@material-ui/core';
import useStyles from './styles.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [childRefs, setChildRefs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => childRefs[i] || createRef());
    setChildRefs(refs);
  }, [places]);

  return (
    <div className="h-screen flex flex-col items-center space-y-6 ">
      <h1 className="text-2xl font-light p-3 border-b border-gray-300 ">
        Restaurants, Hotels & Attractions around you
      </h1>
      {isLoading ? (
        <div className="">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <div className="flex flex-col items-center mb-6 ">
          <div className="flex space-x-8 ">
            <form className="space-y-2">
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </form>
            <form className="space-y-2">
              <InputLabel>Rating</InputLabel>
              <Select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
            </form>
          </div>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={childRefs[i]} key={i} item xs={10}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={childRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default List;
