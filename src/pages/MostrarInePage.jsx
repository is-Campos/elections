import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export const MostrarInePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Toma una foto de tu INE por ambos lados
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 40
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
});
