import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView} from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CandidatosPage, MostrarInePage, PrivacidadPage, VotarPage } from "./src/pages";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { ModalProvider, PoliticasProvider } from "./src/context/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <PoliticasProvider>
          <PaperProvider>
            <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                <NavigationContainer>
                  <Stack.Navigator initialRouteName="Votar">
                    <Stack.Screen name="Home" component={CandidatosPage} />
                    <Stack.Screen
                      name="Privacidad"
                      component={PrivacidadPage}
                    />
                    <Stack.Screen
                      name="Fotos INE"
                      component={MostrarInePage}
                    />
                    <Stack.Screen
                      name="Votar"
                      component={VotarPage}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
              </SafeAreaView>
            </SafeAreaProvider>
          </PaperProvider>
        </PoliticasProvider>
      </ModalProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
