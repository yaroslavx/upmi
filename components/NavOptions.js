import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import {
  LocationMarkerIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: <LocationMarkerIcon />,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: <ShoppingCartIcon />,
    screen: "FoodScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      style={tw`w-full`}
      keyExtractor={(item) => item.id}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`px-6 pb-8 pt-4 bg-gray-100 my-2 rounded-3xl w-full`}
          
          // for production
          // disabled={!origin}

        >
          <View>

          {/* for production   
          <View style={tw`${!origin && "opacity-30"}`}>  */}

            <View style={{ alignItems: "center", padding: 40 }}>
              {item.image}
            </View>
            <Text style={tw`font-semibold text-lg mt-2`}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
