import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { SearchIcon } from '@heroicons/react/outline';
import './Header.css';

const Header = ({ setCoordinates }) => {
  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoCom) => {
    setAutoComplete(autoCom);
  };

  const onPlaceChanged = () => {
    // get long and lat of the selected place
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <div className="static flex items-center justify-between bg-gradient-to-br from-yellow-600 to-yellow-800 p-4">
      <h5 className="text-3xl font-semibold text-white ">PlaceHub</h5>
      <div className="flex space-x-4 items-center">
        <h6 className="text-xl text-white ">Explore new places</h6>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="flex bg-white py-2 px-1 space-x-2 border rounded-xl shadow-lg">
            <div className="flex items-center">
              <SearchIcon className="h-5 text-yellow-800" />
            </div>
            <input
              className="outline-none "
              type="text"
              placeholder="Search..."
            />
          </div>
        </Autocomplete>
      </div>
    </div>
  );
};

export default Header;
