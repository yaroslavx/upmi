import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: {top:50, right:50, bottom:50, left:50}
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const geTravelTime = async () => {
      const URL = fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
      .then(res => res.json())
      .then(data => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      })
    }
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType={"mutedStandard"}
      initialRegion={{
        latitude: 37.78825,
        // latitude: origin.location.lat,
        longitude: -122.4324,
        // longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="black"
        />
      )}

      {origin?.location || (
        // for production
        // {origin?.location && (
       
        <Marker
          coordinate={{
            
            latitude: 37.78825,
            //   for production
            //   latitude: origin.location.lat,
            
            longitude: -122.4324,
            //   for production
            //   longitude: origin.location.lng,
         
          }}
          title="Origin"

          description={origin?.description}
          // for production
          // description={origin.description}

          identifier="origin"
        />
      )}

      {destination?.location || (
        // for production
        // {destination?.location && (

        <Marker
          coordinate={{

            // latitude: 34.059761,
            //   for production
              latitude: destination?.location.lat,

            // longitude: -118.276802,
            //   for production
              longitude: destination?.location.lng,

          }}
          title="Destination"

          description={destination?.description}
          // for production
          // description={destination.description}
          
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
