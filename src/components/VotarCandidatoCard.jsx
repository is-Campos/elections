import { Image, StyleSheet, Text, View } from "react-native";

export const VotarCandidatoCard = ({candidato}) => {

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{candidato.abreviaturaPartido}</Text>
      <Text style={styles.nombre}>{candidato.nombreCompleto}</Text>
      <Image
      style={styles.image}
        width={90}
        height={130}
        source={{
          uri: candidato.foto,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  nombre: {
    fontSize: 10,
    textAlign: "center",
    marginBottom:5
  },
});
