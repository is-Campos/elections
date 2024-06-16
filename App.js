import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  CandidatosPage,
  MostrarInePage,
  PrivacidadPage,
  ResultadosPage,
  VotarPage,
} from "./src/pages";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { ModalProvider, PoliticasProvider } from "./src/context/index";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Suspense, useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Text } from "react-native";
import { SQLiteProvider } from "expo-sqlite/next";

const loadDatabase = async () => {
  const dbName = "votes.db";
  const dbAsset = require("./assets/votes.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.log(e));
  }, []);

  if (!dbLoaded) return <Text>Loading...</Text>;

  return (
    <Suspense fallback={<View style={{backgroundColor:"red"}}><Text>Loading...</Text></View>}>
      <SQLiteProvider databaseName="votes.db" useSuspense>
        <Provider store={store}>
          <ModalProvider>
            <PoliticasProvider>
              <PaperProvider>
                <SafeAreaProvider>
                  <SafeAreaView style={styles.container}>
                    <NavigationContainer>
                      <Stack.Navigator initialRouteName="Resultados">
                        <Stack.Screen name="Home" component={CandidatosPage} />
                        <Stack.Screen
                          name="Privacidad"
                          component={PrivacidadPage}
                        />
                        <Stack.Screen
                          name="Fotos INE"
                          component={MostrarInePage}
                        />
                        <Stack.Screen name="Votar" component={VotarPage} />
                        <Stack.Screen name="Resultados" component={ResultadosPage} />
                      </Stack.Navigator>
                    </NavigationContainer>
                    <StatusBar style="auto" />
                  </SafeAreaView>
                </SafeAreaProvider>
              </PaperProvider>
            </PoliticasProvider>
          </ModalProvider>
        </Provider>
      </SQLiteProvider>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
