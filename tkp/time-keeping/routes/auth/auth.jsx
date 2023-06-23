import { Animated, Dimensions, StyleSheet, View, Image } from "react-native";
import React, { useRef } from "react";
//navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//init Tab
const Tab = createBottomTabNavigator();
//Screen
import Home from "../../screens/home/home";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
//icons

import { useRecoilState } from "recoil";
import home from "../../screens/home/home";
import { Center } from "native-base";

export default function auth() {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-list" : "ios-list-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={home} />

        <Tab.Screen name="Info" component={home} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 65,
    paddingBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#fff",
    marginBottom: 30,
    borderTopWidth: 0,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    position: "absolute",
  },
});
