import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, DefaultTheme } from "@react-navigation/native-stack";
import Auth from "./auth/auth";
import NotAuth from "./notAuth/notAuth";
const Root = createNativeStackNavigator();

export default function index() {
  const MyTheme = {
    colors: {
      background: "#fff",
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Root.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="NotAuth"
      >
        <Root.Screen name="NotAuth" component={NotAuth} options={{ gestureEnabled: false }} />
        <Root.Screen name="Auth" component={Auth} options={{ gestureEnabled: false }} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
