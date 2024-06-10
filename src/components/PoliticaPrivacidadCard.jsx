import { StyleSheet } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

const LeftContent = props => <Avatar.Icon {...props} style={{backgroundColor:"#d51685"}} icon="check-circle" />

export const PoliticaPrivacidadCard = ({ politica }) => {
  return (
    <Card style={styles.cardStyle}>
      <Card.Title
        title={politica.titulo}
        left={LeftContent}
      />
      <Card.Content>
        <Text>{politica.descripcion}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    margin: 10,
    padding: 10,
  }
});
