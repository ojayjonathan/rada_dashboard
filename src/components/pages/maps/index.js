import React from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import classNames from "classnames";

const containerStyle = {
  width: "calc(100% + 2rem)",
  height: "100vh",
  marginLeft: "-1rem",
};

const centers = [
  {
    lat: 1.2921,
    lng: 36,
  },
  {
    lat: 1,
    lng: 36,
  },
  {
    lat: 1,
    lng: 36,
  },
];

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCyxrs2FWQ8pHgQMhS2rFDw-hPui1pLiAg",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const options = { closeBoxURL: "", enableEventPropagation: true };
  const inputClasses = classNames(
    "col-12",
    "py-4 py-md-0 col-md-9",
    "offset-md-3",
    "col-lg-10",
    "offset-lg-2",
    "fixed-top",
    "container",
    "mt-4",
    "px-3"
  );
  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centers[0]}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* <Marker
        icon={{
          path: google .maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        position={centers[0]}
    /> */}
          <Marker
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
            position={centers[1]}
          />
          <Marker
            icon={{
              path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
              fillColor: "yellow",
              fillOpacity: 0.9,
              scale: 2,
              strokeColor: "gold",
              strokeWeight: 2,
            }}
            position={centers[2]}
          />
          {/* <InfoBox options={options} position={centers[0]}>
            
          </InfoBox> */}

          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
      <div className={inputClasses}>
        <div className="mx-auto  col-12 col-md-8 col-lg-6">
          <div className="input-group">
            <input placeholder="Select location" className="form-control" />
            <span
              className="material-icons fs-3 input-group-text"
              id="basic-addon2"
            >
              location_on
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
