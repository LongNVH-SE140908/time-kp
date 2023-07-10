import { Text } from "react-native-svg";

export default function info() {
  var st = localStorage.getItem("userData");
  var data = JSON.parse(st);
  console.log(data);
  return <Text>Your Manager Is: {data.managerUserName}</Text>;
}
