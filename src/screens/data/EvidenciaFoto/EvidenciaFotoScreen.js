import React, {  useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Header from "../../../../components/Header";
import Icon from "react-native-vector-icons/Entypo";
import BotonGuardarInicial from "../../../../components/BotonGuardarInicial";
import * as ImagePicker from 'expo-image-picker';

function EvidenciaFotoScreen(props) {

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header style={styles.headerRegistro1}></Header>
      <ImageBackground
        source={require("../../../../assets/images/T2MDYDINPBHWNGA76MRDJARKGA1.jpg")}
        resizeMode="cover"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}
      >
        <View style={styles.rect}>
          <Text style={styles.titulo1}>Registro de Incidentes</Text>
          <Text style={styles.evidencias}>Evidencias</Text>
          <TextInput
            placeholder="Detalles de las Evidencias"
            style={styles.textInput}
          ></TextInput>
          <View style={styles.iconoFoto}>
            <View style={styles.iconStack}>
              <Icon onPress={pickImage}
                name="camera"
                style={styles.icon}>
              </Icon>
              <Icon name="upload" style={styles.icon1}></Icon>

            </View>
            <View style={styles.rect2}>  {image && (
              <Image source={{ uri: image }} style={{ width: 200, height: 200, marginLeft: 64 }} />
            )}</View>
          </View>

          <View style={styles.fotosConjunto}>
            <View style={styles.iconos}>
              <Icon name="camera" style={styles.camera}></Icon>
              <Icon name="upload" style={styles.archivos}></Icon>
            </View>
            <View style={styles.fotoTomada}></View>
          </View>

          <BotonGuardarInicial
            style={styles.cupertinoButtonSuccess}
          ></BotonGuardarInicial>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:50
   
  },
  headerRegistro1: {
    height: 39,
    borderBottomWidth: 1,
    borderColor: "rgba(7,252,21,1)",
    backgroundColor: "rgba(255,255,255,1)",
    marginTop: 21
  },
  camera: {
    color: "rgba(128,128,128,0.65)",
    fontSize: 32,
    height: 44,
    width: 40
  },
  archivos: {
    color: "rgba(128,128,128,0.65)",
    fontSize: 32,
    height: 44,
    width: 40
  },
  iconos: {
    width: 40,
    marginTop: 9,
    marginBottom: 9
  },
  fotosConjunto:{
    height: 106,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 37,
    marginRight: 53
  },
  image1: {
    width: 360,
    backgroundColor: "rgba(15,15, 15,0.0732)",
    height: 679,
    marginTop: 1,
    paddingBottom:5
    
  },
  iconoFoto: {
    height: 106,
    flexDirection: "row",
    marginTop: 19,
    marginLeft: 37,
    marginRight: 53
  },
  fotoTomada: {
    width: 164,
    height: 106,
    backgroundColor: "#E6E6E6",
    marginLeft: 27
  },
  image1_imageStyle: {
    opacity: 0.61
  },
  rect: {
    width: 321,
    height: 616,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(197,196,196,1)",
    borderRadius: 36,
    shadowColor: "rgba(7,252,21,1)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.41,
    shadowRadius: 0,
    marginTop: 30,
    marginLeft: 20,
    marginBottom:5
  }, 
  iconStack: {
    width: 40,
    marginTop: 10,
    marginBottom: 8
  },
  rect2: {
    width: 164,
    height: 106,
    backgroundColor: "#E6E6E6",
    marginLeft: 27
  },
  titulo1: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 24,
    textAlign: "center",
    opacity: 0.78,
    width: 243,
    height: 29,
    marginTop: 26,
    marginLeft: 39
  },
  evidencias: {
    fontFamily: "roboto-regular",
    color: "#121212",
    opacity: 0.6,
    fontSize: 12,
    marginTop: 27,
    marginLeft: 20
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 30,
    width: 268,
    borderBottomWidth: 1,
    borderColor: "rgba(7,252,21,1)",
    opacity: 0.6,
    textAlign: "left",
    marginTop: 18,
    marginLeft: 20
  },
  icon: {
    color: "rgba(128,128,128,0.65)",
    fontSize: 32,
    height: 44,
    width: 40
  },
  icon1: {
    color: "rgba(128,128,128,0.65)",
    fontSize: 32,
    height: 44,
    width: 40
  },
  cupertinoButtonSuccess: {
    height: 44,
    width: 216,
    marginTop: 92,
    marginLeft: 52
  }
});

export default EvidenciaFotoScreen;
