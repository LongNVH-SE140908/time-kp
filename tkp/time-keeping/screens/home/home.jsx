import { Center, Text, Container, Heading, Button, Slide, Stack, Alert, VStack, HStack, IconButton, CloseIcon, useToast, Divider, Box, Accordion, useDisclose, FlatList, Actionsheet, Select, ScrollView } from "native-base";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import getUserTimekeeping, { checkOutTimekeeping, checkinTimekeeping } from "../../api/timekeeping/timekeepingapi";
export default function home() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isCheckin, setIsCheckin] = React.useState(false);
  const [isDone, setisDone] = React.useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [acctionSetItem, setAcctionSetItem] = useState([]);
  var data = localStorage.getItem("userData")?.toString();
  var user = JSON.parse(data || "");

  const [timekp, setTimekp] = useState({});
  useEffect(() => {
    async function fetchData() {
      var data = await getUserTimekeeping(user.token);
      console.log(data);
      if (!data.isError) {
        setTimekp(data.data[0]);
      }
    }
    fetchData();
  }, [isDone]);
  function getName() {
    var name = "";
    timekp.clock_time.map((i, v) => {
      console.log(v);
    });
  }

  async function checkin() {
    console.log(timekp.clock_time);
    var data = await checkinTimekeeping(user.token);
    if (!data.isError) {
      setisDone(!isDone);
      toast.show({
        title: data.message,
        status: "success",
      });
    } else {
      toast.show({
        title: data.message,
        status: "warning",
      });
    }
  }
  async function checkout() {
    var data = await checkOutTimekeeping(user.token);
    if (!data.isError) {
      setisDone(!isDone);
      toast.show({
        title: data.message,
        status: "success",
      });
    } else {
      toast.show({
        title: data.message,
        status: "warning",
      });
    }
  }
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec);

    const intervalId = setInterval(
      () => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec);
      },
      60000,
      true
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  async function rederItem(data) {
    await setAcctionSetItem(data);
    onOpen();
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Box>
          <Heading>
            <Ionicons size="xl" name="calendar-outline"></Ionicons>
            <Text style={{ width: 500 }}>{currentDate}</Text>
            <Divider my={6} />
            <Center>
              <View style={{ minWidth: 350, display: "flex", flexDirection: "column" }}>
                <Button style={{ marginBottom: 10 }} onPress={checkin} size="md">
                  Checkin
                </Button>
                <Button onPress={checkout} size="md">
                  Checkout
                </Button>
              </View>
            </Center>
            <Divider my="6"></Divider>
            <Text style={{ display: "flex", marginBottom: 10 }}>TimeKeeping History </Text>
            {Array.isArray(timekp.clock_time)
              ? timekp.clock_time?.map((v, i) => {
                  {
                    return (
                      <View style={{ display: "flex", flexDirection: "column", marginBottom: 10 }} key={i}>
                        <Button onPress={() => rederItem(v.info.detail)}>{v.date}</Button>
                        <Actionsheet key={i} hideDragIndicator id={i} isOpen={isOpen} onClose={onClose}>
                          <Actionsheet.Content>
                            <Box w="100%" h={30} px={4} justifyContent="center">
                              <Text
                                fontSize="16"
                                color="gray.500"
                                _dark={{
                                  color: "gray.300",
                                }}
                              >
                                {"Date " + v.date}
                              </Text>
                            </Box>

                            {acctionSetItem?.map((va, it) => {
                              return (
                                <Actionsheet.Item>
                                  <Text style={{ width: "100%" }}>
                                    {new Date(va.check_in).toLocaleTimeString()} - {va.check_out == "" ?? new Date(va.check_out).toLocaleTimeString() == "" ? "No data" : new Date(va.check_out).toLocaleTimeString()} - Total Minute:{" "}
                                    {va.isValid ? va.total_minute + " (Valid)" : va.total_minute + " (Not Valid)"}
                                  </Text>
                                </Actionsheet.Item>
                              );
                            })}
                          </Actionsheet.Content>
                        </Actionsheet>
                      </View>
                    );
                  }
                })
              : []}
          </Heading>
        </Box>
      </View>
    </ScrollView>
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
