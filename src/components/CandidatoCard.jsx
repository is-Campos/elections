import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export const CandidatoCard = ({candidatoData}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{candidatoData.nombreCompleto}</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    marginVertical: 10
  }
})
