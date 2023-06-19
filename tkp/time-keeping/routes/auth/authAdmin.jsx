import { Animated, Dimensions, StyleSheet, View, Image } from "react-native";
import React, { useRef } from "react";
//navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//init Tab
const Tab = createBottomTabNavigator();
//Screen
import Home from "../../screens/home/home";

//icons

import { useRecoilState } from "recoil";

export default function auth() {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            if (route.name === "Home") {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? "https://icons8.com/icon/86527/home" : "https://icons8.com/icon/83326/home"}
                />
              );
            } else if (route.name === "Book") {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={
                    focused
                      ? "https://icons8.com/icon/4Z7EBZWE96y9/open-book"
                      : "https://icons8.com/icon/x25hsQceGEys/open-book"
                  }
                />
              );
            } else if (route.name === "User") {
              return (
                <Image
                  style={{ width: 24, height: 24 }}
                  source={focused ? "https://icons8.com/icon/DvG9sokSVTRZ/user" : "https://icons8.com/icon/22396/user"}
                />
              );
            }
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarStyle: styles.tab,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
            },
          }}
        />
        <Tab.Screen
          name="Book"
          component={Book}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
            },
          }}
        />
        <Tab.Screen
          name="Bag"
          component={Bag}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
            },
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          listeners={{
            tabPress: (e) => {
              // Prevent default action
            },
          }}
        />
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
