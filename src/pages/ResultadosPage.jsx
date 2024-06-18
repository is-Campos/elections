import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";
import { useFont, vec, LinearGradient } from "@shopify/react-native-skia";
import bookmontreal from "../../assets/PPNeueMontreal-Book.otf";
import { useContext } from "react";
import { allCandidatos, candidaturas, partidos } from "../data";
import { VotosContext } from "../context";
import { Button } from "react-native-paper";

export const ResultadosPage = ({navigation}) => {
  const font = useFont(bookmontreal, 12);
  const { votos, setVotos } = useContext(VotosContext);

  const countVotosByPartido = (idCandidatura, idPartido) => {
    const filteredVotes = votos.filter(
      (voto) =>
        voto.idCandidatura == idCandidatura && voto.idPartido == idPartido
    );
    return filteredVotes.length;
  };

  const findVotosCandidatura = (idCandidatura) => {
    const votes = partidos.map((partido, index) => ({
      partido: partido.abreviatura,
      numeroVotos: countVotosByPartido(idCandidatura, partido.id),
    }));

    // console.log(votes)
    return votes;
  };

  const getMaxVotes = (votosCandidatura) => {
    return Math.max(...votosCandidatura.map(v => v.numeroVotos), 0);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.pageTitle}>Resultados Actuales</Text>
        {candidaturas.map((candidatura) => (
          <View key={candidatura.id} style={styles.chartCard}>
            <Text style={styles.title}>{candidatura.cargoPolitico}</Text>
            <CartesianChart
              data={findVotosCandidatura(candidatura.id)}
              xKey="partido"
              yKeys={["numeroVotos"]}
              domainPadding={{ left: 50, right: 50, top: 30 }}
              axisOptions={{
                font,
              }}
              domain={{ y: [0, getMaxVotes(findVotosCandidatura(candidatura.id))] }}
            >
              {({ points, chartBounds }) => (
                <Bar
                  barCount={4}
                  innerPadding={0}
                  chartBounds={chartBounds}
                  points={points.numeroVotos}
                  roundedCorners={{
                    topLeft: 5,
                    topRight: 5,
                  }}
                >
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 400)}
                    colors={["#d51685", "#d5168550"]}
                  />
                </Bar>
              )}
            </CartesianChart>
          </View>
        ))}
        <View style={styles.button}>
          <Button onPress={()=>navigation.navigate('Home')} textColor="white">Ir a inicio</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
    marginVertical: 25,
  },
  chartCard: {
    height: 500,
    marginHorizontal: 15,
    backgroundColor: "#e5dfed",
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
  },
  pageTitle: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 26,
    marginVertical: 25,
  },
  button: {
    backgroundColor: "#d51685",
    width: "80%",
    alignSelf: "center",
    marginVertical: 30,
    paddingVertical: 6,
    borderRadius: 6
  },
});
