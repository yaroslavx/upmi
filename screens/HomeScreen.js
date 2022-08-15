import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import {setOrigin, setDestination, selectOrigin} from "../slices/navSlice"
import { useDispatch, useSelector } from "react-redux";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://see.fontimg.com/api/renderfont4/eZ4dO/eyJyIjoiZnMiLCJoIjoxNzQsInciOjIwMDAsImZzIjo4NywiZmdjIjoiIzAwMDAwMCIsImJnYyI6IiNGRkZERkQiLCJ0IjoxfQ/VVBNSQ/goldleaf-bold-personal-use-bold.png",
          }}
        />
        <GooglePlacesAutocomplete
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: details.description
            }))
            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          enablePoweredByContainer={false}
          minLength={2}
          placeholder="Where from?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <NavOptions />
        <NavFavorites/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
