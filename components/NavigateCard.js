import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { selectDestination, setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-xl mx-auto py-5`}>NavigateCard</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>            
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                selectDestination({
                  location: details.geometry.location,
                  description: details.description,
                })
              );
              navigation.navigate("RideOptionsCard")
            }}
            returnKeyType={"search"}
            minLength={2}
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />

        </View>
      <View style={tw`ml-5`}> 
      <NavFavorites/>
      </View>
      <View style={tw`flex-row justify-evenly bg-white mt-auto py-4`}>
        <TouchableOpacity onPress={() => navigation.navigate("RideOptionsCard")} style={tw`bg-black justify-between flex flex-row w-24 px-4 py-3 rounded-full`}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-white justify-between flex flex-row w-24 px-4 py-3 rounded-full`}>
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
          <Text style={tw`text-black text-center`}>Eats </Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
