import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const ModalPropuestas = () => {
  const { isModalVisible, setIsModalVisible, propuestas } =
    useContext(ModalContext);

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={containerStyle}
        >
          <Text style={styles.title}>Propuestas</Text>
          {propuestas.map((propuesta, index) => (
            <View key={index} style={styles.propuesta}>
              <Text style={styles.text}>
                {propuesta}
              </Text>
            </View>
          ))}
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  propuesta: {
    marginVertical: 10,
    backgroundColor: "#d51685",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  text:{
    fontSize:15,
    color:"white"
  },
  title:{
    fontSize:30,
    fontWeight: "500",
    marginBottom:15
  }
});
