import React from "react";
import { RecoilRoot } from "recoil";
import Routes from "./routes/index";
import { StyleSheet } from "react-native";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  StatusBar,
  View,
} from "native-base";
import NativeBaseIcon from "./components/NativeBaseIcon";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <View style={styles.root}>
          <Routes />
          <StatusBar barStyle="light-content" />
        </View>
      </NativeBaseProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
