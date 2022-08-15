import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from "twrnc"

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Code Street, London, UK"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "London Eye, London, UK"
    },
]


const NavFavorites = () => {
  return (
    <View>
      <FlatList data={data} keyExtractor={item => item.id}
      renderItem={({item: {location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row items-center mt-2 `}>
            <Icon
            style={tw`rounded-full bg-gray-100 p-3 my-2 mr-5`}
            name={icon}
            type="ionicon"
            color="gray"
            size={18}
            />
            <View>
                <Text style={tw`font-semibold`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default NavFavorites

const styles = StyleSheet.create({})