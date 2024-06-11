import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { CameraView } from "expo-camera";
import { useCameraPermissions } from "expo-camera";
import { Button as ButtonRNP } from "react-native-paper";
import * as MediaLibrary from 'expo-media-library';

export const MostrarInePage = ({navigation}) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [currentSide, setCurrentSide] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tu permiso para acceder a la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  if (!mediaLibraryPermission) {
    return <View />;
  }

  if (!mediaLibraryPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tu permiso para acceder a la biblioteca de medios
        </Text>
        <Button onPress={requestMediaLibraryPermission} title="Conceder permiso" />
      </View>
    );
  }

  const handleTakePicture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        if (currentSide === "front") {
          setFrontImage(photo.uri);
        } else if (currentSide === "back") {
          setBackImage(photo.uri);
        }
        setIsCameraVisible(false);
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  };

  const handleOpenCamera = (side) => {
    if (side !== "front" && side !== "back") {
      console.error("Lado de la cámara inválido:", side);
      return;
    }
    setCurrentSide(side);
    setIsCameraVisible(true);
  };

  const handleSaveImages = async () => {
    try {
      const frontImageAsset = await MediaLibrary.createAssetAsync(frontImage);
      const backImageAsset = await MediaLibrary.createAssetAsync(backImage);
  
      alert("Imágenes guardadas exitosamente!");

      navigation.navigate("Votar")
    } catch (error) {
      console.error("Error al guardar las imágenes:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          A continuación, toma una foto de tu INE por ambos lados
        </Text>
        {isCameraVisible ? (
          <>
            <Text style={styles.textoside}>
              {currentSide === 'front' ? "Paso 1: " : "Paso 2: "}
              Capturar la parte{" "}
              {currentSide === "front" ? "frontal" : "trasera"}
            </Text>
            <View style={styles.cameraContainer}>
              <CameraView style={styles.camera} ref={cameraRef}>
                <View style={styles.cameraButtonContainer}>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={handleTakePicture}
                  >
                    <ButtonRNP
                      textColor="black"
                      icon={"camera"}
                      style={styles.cameraButton}
                    >
                      Capturar
                    </ButtonRNP>
                  </TouchableOpacity>
                </View>
              </CameraView>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={!frontImage ? styles.captureButton : styles.imageview}
              onPress={() => handleOpenCamera("front")}
            >
              {frontImage ? (
                <Image source={{ uri: frontImage }} style={styles.image} />
              ) : (
                <Text style={styles.text}>Tomar foto frontal del INE</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={!backImage ? styles.captureButton : styles.imageview}
              onPress={() => handleOpenCamera("back")}
            >
              {backImage ? (
                <Image source={{ uri: backImage }} style={styles.image} />
              ) : (
                <Text style={styles.text}>Tomar foto trasera del INE</Text>
              )}
            </TouchableOpacity>
          </>
        )}
        {
          frontImage && backImage && !isCameraVisible ? (
            <ButtonRNP onPress={handleSaveImages} textColor="white" style={styles.btnVerificar}>Verificar</ButtonRNP>
          ) : null
        }
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
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  captureButton: {
    width: "100%",
    padding: 20,
    backgroundColor: "#d51685",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  imageview:{
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  textCapturar: {
    fontSize: 18,
    color: "black",
  },
  textoside: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
  },
  cameraContainer: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.3,
    alignSelf: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    width: "100%",
    borderRadius: 6,
  },
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cameraButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    opacity: 0.7,
  },
  btnVerificar: {
    backgroundColor: "#d51685",
    padding: 10,
    borderRadius: 6,
  }
});
