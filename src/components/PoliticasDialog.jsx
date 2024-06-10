import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Text,
} from "react-native-paper";
import { PoliticasContext } from "../context";

export const PoliticasDialog = ({ title, description }) => {
  const { isDialogVisible, setIsDialogVisible } = useContext(PoliticasContext);

  const hideDialog = () => setIsDialogVisible(false);

  return (
    <View>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{description}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              style={{
                borderRadius: 6,
                backgroundColor: "#d51685",
                paddingHorizontal: 10,
              }}
              onPress={hideDialog}
            >
              Aceptar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
