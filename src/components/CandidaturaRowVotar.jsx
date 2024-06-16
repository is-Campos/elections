import { StyleSheet, Text, View } from "react-native";
import { VotarCandidatoCard } from "./VotarCandidatoCard";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import { allCandidatos } from "../data";

export const CandidaturaRowVotar = ({
  candidatura,
  userVotes,
  setUserVotes,
}) => {
  const [checked, setChecked] = useState();

  const candidatos = allCandidatos.filter(
    (candidato) => candidato.cargoPolitico === candidatura.cargoPolitico
  );

  return (
    <>
      <Text style={styles.title}>{candidatura.cargoPolitico}</Text>
      <View style={styles.rowContainer}>
        {candidatos.map((candidato) => (
          <View key={candidato.id}>
            <VotarCandidatoCard candidato={candidato} />
            <View style={styles.check}>
              <RadioButton
                value={candidato.id}
                status={checked === candidato.id ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(candidato.id);
                  setUserVotes((userVotes) =>
                    userVotes.map((voto) =>
                      voto.candidaturaId === candidatura.id
                        ? { ...voto, candidatoId: candidato.id, partidoId: candidato.idPartido }
                        : voto
                    )
                  );
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  checkContainer: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
  },
  check: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    width: 40,
    alignSelf: "center",
    marginVertical: 10,
  },
});
