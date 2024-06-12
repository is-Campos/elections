import React, { useState, useRef, useEffect } from "react";
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

export const VotarPage = ({navigation}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const [videoUri, setVideoUri] = useState(null);
  
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    const saveVideo = async () => {
      if (videoUri !== null) {
        try {
          await MediaLibrary.createAssetAsync(videoUri);
          alert("Video guardado exitosamente!");
        } catch (error) {
          console.error("Failed to save video", error);
        }
      }
    };
    saveVideo();
  }, [videoUri]);

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

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      console.log("entra a ref")
      try {
        console.log("aaaaaayuda")
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        console.log("paso el record await")
        setVideoUri(video.uri);
        console.log("Recording started", video.uri);
      } catch (error) {
        console.error("Failed to start recording", error);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      try {
        cameraRef.current.stopRecording();
        setIsRecording(false);
        console.log("Recording stopped");
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          A continuación, toma una foto de tu INE por ambos lados
        </Text>

          <>
            <View style={styles.cameraContainer}>
              <CameraView facing="front" mode="video" style={styles.camera} ref={cameraRef}>
                <View style={styles.cameraButtonContainer}>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={startRecording}
                  >
                    <ButtonRNP
                      textColor="black"
                      icon={"camera"}
                      style={styles.cameraButton}
                    >
                      Empezar a grabar
                    </ButtonRNP>
                  </TouchableOpacity>
                </View>
              </CameraView>
              <ButtonRNP onPress={stopRecording}>Dejar de grabar</ButtonRNP>
              {/* <ButtonRNP onPress={saveVideo}>Guardar video</ButtonRNP> */}
            </View>
          </>
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
