import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { ModalContext } from "../context/ModalContext";
 
export const CandidatoCard = ({ candidatoData }) => {
  
  const {setIsModalVisible, setPropuestas} = useContext(ModalContext)
  
  const handlePropuestasOnClick = () => {
    setIsModalVisible(true)
    setPropuestas(candidatoData.propuestas)
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{candidatoData.nombreCompleto}</Text>
        <Text variant="bodyMedium">{candidatoData.abreviaturaPartido}</Text>
      </Card.Content>
      <View style={styles.fotoWrapper}>
        <Card.Cover
          style={styles.foto}
          source={{ uri: "https://picsum.photos/700" }}
        />
      </View>
      <Card.Actions>
        {/* <Button>Cancel</Button> */}
        <Button
          textColor="black"
          style={styles.button}
          onPress={handlePropuestasOnClick}
        >
          Ver propuestas
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "80%",
    marginVertical: 10,
  },
  fotoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  foto: {
    width: "50%",
  },
  button: {
    borderColor: "#d51685",
    borderRadius: 6
  },
});
