import { Center, Text, Container, Heading, Button, Slide, Stack, Alert, VStack, HStack, IconButton, CloseIcon } from "native-base";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { textState, userAppState } from "../../store/user/user";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableHighlight } from "react-native-gesture-handler";
import getUserTimekeeping, { checkinTimekeeping } from "../../api/timekeeping/timekeepingapi";

import { TimeKeeping } from "../../models/timekeeping";
export default function home() {
  const userApp = useRecoilValue(textState);
  const [tostVisibleSuccess, setToastVisibleSuccess] = useState(false);
  const [tostVisibleError, setToastVisibleError] = useState(false);

  const [messageError, setMessageError] = React.useState("");
  const [messageSuccess, setMessageSuccess] = React.useState("");

  var data = localStorage.getItem("userData")?.toString();
  var user = JSON.parse(data || "");

  const [timekp, setTimekp] = useState({});
  useEffect(() => {
    async function fetchData() {
      var data = await getUserTimekeeping(user.token);

      if (!data.isError) {
        setTimekp(data.data[0]);
      }
    }
    fetchData();
  }, [2]);
  function getName() {
    var name = "";
    timekp.clock_time.map((i, v) => {
      console.log(v);
    });
  }
  async function checkin() {
    console.log(timekp);
    var data = await checkinTimekeeping(user.token);
    if (!data.isError) {
      setMessageSuccess(data.message);
      setToastVisibleSuccess(true);
    } else {
      setMessageError(data.message);
      setToastVisibleError(true);
    }
  }
  return (
    <View style={styles.container}>
      <Center>
        <Container>
          <Heading>
            <Button onPress={checkin} size="sm">
              {() => "123123"}
            </Button>
          </Heading>
          <Text mt="3" fontWeight="medium">
            NativeBase is a simple, modular and accessible component library that gives you building blocks to build you React applications.
          </Text>
        </Container>
      </Center>

      <Slide in={tostVisibleSuccess} style={{ alignItems: "center" }}>
        <Center style={styles.tostBox}>
          <Stack space={3} w="90%" maxW="400">
            <Alert w="100%" status="success">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <Center>
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon />
                      <Text>{messageSuccess}</Text>
                    </HStack>
                  </Center>
                  <IconButton onPress={() => setToastVisibleSuccess(false)} style={{ marginRight: 8 }} variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} />
                </HStack>
              </VStack>
            </Alert>
          </Stack>
        </Center>
      </Slide>
      <Slide in={tostVisibleError} style={{ alignItems: "center" }}>
        <Center style={styles.tostBox}>
          <Stack space={3} w="90%" maxW="400">
            <Alert w="100%" status="error">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <Center>
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon />
                      <Text>{messageError}</Text>
                    </HStack>
                  </Center>
                  <IconButton onPress={() => setToastVisibleError(false)} style={{ marginRight: 8 }} variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} />
                </HStack>
              </VStack>
            </Alert>
          </Stack>
        </Center>
      </Slide>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 95,
  },
  circle: {
    borderRadius: Math.round(Dimensions.get("window").width + Dimensions.get("window").height) / 2,
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").width * 0.5,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 60,
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: "#88b484",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  textLogin: {
    fontFamily: "Roboto-medium",
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  boxLogin: {
    flex: 1,
    justifyContent: "center",
  },
  boxVersion: {
    bottom: 100,
  },
  textVersion: {
    fontFamily: "Roboto-medium",
    fontSize: 14,
  },
  modal: {
    backgroundColor: "rgba(0, 0, 0,0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxModal: {
    top: "50%",
  },
  boxNameApp: {
    alignItems: "center",
  },
  txtNameApp: {
    fontFamily: "Roboto-bold",
    fontSize: 25,
  },
  tostBox: {
    position: "absolute",
    bottom: 30,
  },
});
