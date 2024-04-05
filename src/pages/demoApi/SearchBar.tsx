import { Button } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { LatLngExpression } from "leaflet";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?limit=5";

export interface PlaceData {
  address: {
    address: string;
    ISO3166_2_lvl4: string;
    city: string;
    country: string;
    country_code: string;
    postcode: string;
    state: string;
    state_district: string;
    town: string;
    village: string;
  };
  addresstype: string;
  boundingbox: [string, string, string, string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}

interface SearchBarProps {
  setSelectPosition: React.Dispatch<
    React.SetStateAction<LatLngExpression | null>
  >;
  setSearchAddress: React.Dispatch<React.SetStateAction<PlaceData | undefined>>;
}

export default function SearchBox({
  setSelectPosition,
  setSearchAddress,
}: SearchBarProps) {
  //   const { setSelectPosition } = props;
  // const setSelectPosition: LatLngExpression = [51.505, -0.09];

  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState<PlaceData[]>();

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: "1",
      polygon_geojson: "0",
      countrycodes: "IN,US,CA", // Include multiple country codes separated by commas
    };

    axios
      .get<PlaceData[]>(NOMINATIM_BASE_URL, { params })
      .then((response) => {
        console.log(response.data);
        setListPlace(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <input
            className="p-2 rounded-md"
            style={{ width: "100%" }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
        >
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
      <div>
        <ul>
          {listPlace &&
            listPlace.map((item) => (
              <li key={item?.place_id}>
                <div
                  className="flex text-xs p-2 cursor-pointer text-white hover:bg-gray-700"
                  onClick={() => {
                    setSelectPosition([
                      parseFloat(item.lat),
                      parseFloat(item.lon),
                    ] as LatLngExpression);
                    setSearchAddress(item);
                  }}
                >
                  <img
                    src="./placeholder.png"
                    alt="Placeholder"
                    style={{ width: "20px", height: "20px" }}
                  />
                  {item?.display_name}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
