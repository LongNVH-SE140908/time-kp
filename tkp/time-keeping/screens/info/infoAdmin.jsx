import { Button } from "native-base";
import { Text } from "react-native-svg";

export default function infoAdmin() {
  var st = localStorage.getItem("userData");
  var data = JSON.parse(st);
  console.log(data);
  function leave() {}
  return (
    <>
      <Text>
        Your Empoyee Managers Is:{" "}
        {data.lstManagerUser.map((v) => (
          <>
            <br></br>
            <Text> {v}</Text>
          </>
        ))}
      </Text>
      <Button onPress={leave}>Leave Management</Button>
    </>
  );
}
