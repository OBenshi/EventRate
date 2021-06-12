import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";

export default function Trulolo() {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ru" },
    },
  });

  return (
    <div>
      <input ref={ref} style={{ width: "90%" }} defaultValue="Amsterdam" />;
    </div>
  );
}
