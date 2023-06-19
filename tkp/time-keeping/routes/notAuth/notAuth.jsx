import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Login from "../../screens/login/login";
export default function notAuth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
