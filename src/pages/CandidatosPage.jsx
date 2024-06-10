import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { CandidatoCard } from "../components/CandidatoCard";
import { allCandidatos } from "../data/candidatos";
import { candidaturas } from "../data/index";
import { CandidaturaBtn } from "../components/CandidaturaBtn";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCandidatosMostrados } from "../redux/candidatosSlice";
import { ModalPropuestas } from "../components/ModalPropuestas";
import { Button } from "react-native-paper";

export const CandidatosPage = ({navigation}) => {
  const [selectedCandidaturaId, setSelectedCandidaturaId] = useState(1);
  const candidatos = useSelector((state) => state.candidatos.value);
  const dispatch = useDispatch();

  const handleSelectedCandidaturaChanged = (id) => {
    setSelectedCandidaturaId(id);
    dispatch(
      setCandidatosMostrados(
        allCandidatos.filter((candidato) => candidato.candidaturaId === id)
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.inelogo}
            source={require("../../assets/INE.png")}
          />
          <Text style={styles.titleText}>INE</Text>
        </View>

        <View style={styles.candidaturasContainer}>
          {candidaturas.map((candidatura) => (
            <TouchableOpacity
              key={candidatura.id}
              onPress={() => handleSelectedCandidaturaChanged(candidatura.id)}
            >
              <CandidaturaBtn
                key={candidatura.id}
                candidatura={candidatura}
                isSelected={
                  candidatura.id === selectedCandidaturaId ? true : false
                }
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.cardContainer}>
          {candidatos.map((candidato) => (
            <CandidatoCard key={candidato.id} candidatoData={candidato}/>
          ))}
        </View>

        <ModalPropuestas/>

        <Button textColor="white" onPress={()=>navigation.navigate('Privacidad')} labelStyle={{fontSize:20, fontWeight:"bold"}} style={styles.btnVotar}>Votar</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  titleText: {
    fontSize: 35,
    textAlign: "center",
  },
  inelogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  candidaturasContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btnVotar: {
    backgroundColor: "#d51685",
    width: "70%",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 6,
    paddingVertical: 10,
  }
});
