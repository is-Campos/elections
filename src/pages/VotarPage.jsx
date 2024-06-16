import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { CameraView } from "expo-camera";
import { useCameraPermissions } from "expo-camera";
import { Button as ButtonRNP } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import { CandidaturaRowVotar } from "../components";
import { candidaturas } from "../data";
import { useSQLiteContext } from "expo-sqlite";

export const VotarPage = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const candidaturasInitialState = candidaturas.map(candidatura => ({candidaturaId: candidatura.id, candidatoId: 0}))
  const [userVotes, setUserVotes] = useState(candidaturasInitialState)
  const [votes, setVotes] = useState([])
  const [videoUri, setVideoUri] = useState(null);

  const db = useSQLiteContext();

  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

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

  const getVotes = async() => {
    // const dbcreate = await db.execAsync(`CREATE TABLE IF NOT EXISTS vote (id INTEGER PRIMARY KEY AUTOINCREMENT, idCandidatura INTEGER, idCandidato INTEGER);`);
    const result = await db.getAllAsync('SELECT * FROM vote')
    setVotes(result)
    console.log(result)
    console.log(candidaturasInitialState)
  }

  const insertVotes = async() => {
    userVotes.forEach(async(vote) => {
      await db.runAsync(`INSERT INTO vote (idCandidatura, idCandidato) VALUES (${vote.candidaturaId}, ${vote.candidatoId});`)
    });
  }

  useEffect(()=>{
    console.log(db)
    db.withTransactionAsync(async () => {
      await getVotes()
    })
  },[db])

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
        <Button
          onPress={requestMediaLibraryPermission}
          title="Conceder permiso"
        />
      </View>
    );
  }

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      console.log("entra a ref");
      try {
        console.log("aaaaaayuda");
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        console.log("paso el record await");
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
        db.withTransactionAsync(async () => {
          await insertVotes()
          await getVotes()
        })
      } catch (error) {
        console.error("Failed to stop recording", error);
      }
    }

    // db.withTransactionAsync(async () => {
    //   await getVotes()
    // })
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>
          Selecciona el candidato de tu preferencia para cada candidatura
        </Text>

        <>
          <View style={styles.cameraContainer}>
            <CameraView
              facing="front"
              mode="video"
              style={styles.camera}
              ref={cameraRef}
              onCameraReady={startRecording}
            >
              <View style={styles.cameraButtonContainer}>
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
              </View>
            </CameraView>
            {/* <ButtonRNP onPress={saveVideo}>Guardar video</ButtonRNP> */}
          </View>
        </>
        {candidaturas.map((candidatura) => (
          <CandidaturaRowVotar key={candidatura.id} candidatura={candidatura} userVotes={userVotes} setUserVotes={setUserVotes}/>
        ))}

        <ButtonRNP style={styles.btnVotar} textColor="white" onPress={stopRecording}>Enviar Voto</ButtonRNP>
      </ScrollView>
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
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 50,
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
  imageview: {
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
    marginVertical: 20,
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
  btnVotar: {
    backgroundColor: "#d51685",
    padding: 10,
    borderRadius: 6,
    width: "80%",
    alignSelf: "center",
    marginVertical: 20
  },
});
