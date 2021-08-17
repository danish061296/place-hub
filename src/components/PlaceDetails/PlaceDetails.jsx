import React from 'react';
import { LocationMarkerIcon, PhoneIcon } from '@heroicons/react/solid';
import Rating from '@material-ui/lab/Rating';
import restaurant from './restaurant.jpg';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const cuisines = ['French', 'Chicken', 'Gluten Free', 'Spicy'];

  return (
    <div className=" bg-white shadow-2xl rounded-lg cursor-pointer transform transition duration-700 hover:scale-105">
      <img
        className=" h-30 w-full rounded-t-lg "
        src={place.photo ? place.photo.images.large.url : restaurant}
        alt="restaurant"
      />
      <div className="flex flex-col px-3 py-2">
        <h1 className="text-2xl font-semibold font-serif border-b border-gray-200 mb-2">
          {place.name}
        </h1>
        <div className="flex justify-between space-y-2 ">
          <Rating value={Number(place.rating || '3')} readOnly />
          <p className="text-sm">out of {place.num_reviews || 50} reviews</p>
        </div>
        <div className="flex justify-between space-y-2 ">
          <p className="text-yellow-600 font-semibold">Price</p>
          <p className="text-sm">{place.price || '$2 - $30'}</p>
        </div>
        <div className="flex justify-between  mb-2">
          <p className="text-yellow-600 font-semibold">Ranking</p>
          <p className="text-sm">
            {place.ranking || '#80 of 4,932 Restaurants in San Francisco'}
          </p>
        </div>

        <div className="border-b border-gray-200 mb-2">
          {place?.awards?.slice(0, 2).map((award, idx) => (
            <div key={idx} className="flex justify-between mb-2 ">
              <img
                className="h-4 w-3"
                src={award.images.small}
                alt={award.display_name}
              />
              <p className="text-gray-500 text-xs">{award.display_name}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap w-3/4  my-2 justify-left items-left ">
          {place?.cuisine
            ? place?.cuisine?.map(({ name, key }) => (
                <p
                  className="text-xs text-white bg-yellow-700 mb-2 px-2 mr-2 rounded-lg w-15"
                  key={key}
                >
                  {name}
                </p>
              ))
            : cuisines.map((cuisine, idx) => (
                <p
                  className="text-xs text-white bg-yellow-700 mb-2 px-2 mr-2 rounded-lg w-15"
                  key={idx}
                >
                  {cuisine}
                </p>
              ))}
        </div>
        <div className="flex justify-between">
          {place?.address && (
            <>
              <LocationMarkerIcon className="h-4" />
              <p className="text-xs text-gray-600 ">{place.address}</p>
            </>
          )}
        </div>
        <div className="flex justify-between mt-2">
          {place?.phone && (
            <>
              <PhoneIcon className="h-4" />
              <p className="text-xs text-gray-600 ">{place.phone}</p>
            </>
          )}
        </div>
        <div className="text-xs my-2 ">
          <button
            className="bg-gray-300 border border-gray-400 mr-3 p-1 rounded-md"
            onClick={() => window.open(place.web_url, '_blank')}
          >
            Trip Advisor
          </button>
          <button
            className="bg-gray-300 border border-gray-400 mr-3 p-1 rounded-md"
            onClick={() => window.open(place.website, '_blank')}
          >
            Website
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
