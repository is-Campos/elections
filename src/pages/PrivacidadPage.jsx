import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { politicasDePrivacidad } from "../data";
import {
  PoliticaPrivacidadCard,
  PoliticasCheckbox,
  PoliticasDialog,
} from "../components/index";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { PoliticasContext } from "../context";

export const PrivacidadPage = ({ navigation }) => {
  const { checked } = useContext(PoliticasContext);
  const { setIsDialogVisible } = useContext(PoliticasContext);

  const handleComenzar = () => {
    if (!checked) {
      setIsDialogVisible(true);
      return;
    }

    navigation.navigate("Votar");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <PoliticasDialog
          title={"Error"}
          description={
            "Antes de comenzar debes aceptar las políticas de privacidad"
          }
        />
        <View>
          <Text style={styles.title}>Politicas de Privacidad</Text>
          {politicasDePrivacidad.map((politica) => (
            <PoliticaPrivacidadCard key={politica.id} politica={politica} />
          ))}
          <PoliticasCheckbox />
          <Button
            onPress={handleComenzar}
            style={styles.button}
            textColor="white"
          >
            Comenzar
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#d51685",
    width: "70%",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 6,
    paddingVertical: 10,
  },
});
