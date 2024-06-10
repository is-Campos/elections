import { useContext } from "react";
import { Checkbox } from "react-native-paper";
import { PoliticasContext } from "../context";
import { StyleSheet, Text, View } from "react-native";

export const PoliticasCheckbox = () => {
  const { setChecked, checked } = useContext(PoliticasContext);

  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>
        <Checkbox
          color="#d51685"
          uncheckedColor="blue"
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />
      </View>
      <Text>Acepto las políticas de privacidad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    marginRight:15
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical:20
  }
});
