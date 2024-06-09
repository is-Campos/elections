import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CandidatosPage } from "./src/pages";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./src/context/ModalProvider";

export default function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <PaperProvider>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <CandidatosPage />
              <StatusBar style="auto" />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </ModalProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
