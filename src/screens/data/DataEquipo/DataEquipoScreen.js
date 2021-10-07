import React, { Component, useState } from "react";
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

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

function DataEquipoScreen(props) {
  const [Horas, setHoras] =useState(0);
  
  return (
    <View style={styles.container}>
      <Header style={styles.header_Registro}></Header>
      <ImageBackground
        source={require("../../../../assets/images/T2MDYDINPBHWNGA76MRDJARKGA1.jpg")}
        resizeMode="cover"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}
      >
        <View style={styles.contenedorDatos1}>
          <Text style={styles.titulo1}>Registro de Incidentes</Text>
          <Text style={styles.equipo}>Equipo</Text>
          <TextInput
            placeholder="Ingrese Equipo"
            style={styles.textInput}
          ></TextInput>
          <Text style={styles.tiempoDeParada}>Tiempo de parada</Text>
          <View style={styles.textInput2Row}>
            <Text style={styles.textInput2}>{Horas} Horas</Text>
            <TouchableOpacity onPress={()=>setHoras(Horas-1)}>
              <FontAwesomeIcon
                name="minus"
                style={styles.icon}
              ></FontAwesomeIcon></TouchableOpacity>
            <TouchableOpacity  onPress={()=>setHoras(Horas+1)}>
              <FontAwesomeIcon
                name="plus"
                style={styles.icon}
              ></FontAwesomeIcon></TouchableOpacity>
          </View>
          <Text style={styles.detalleDeParada}>Detalle de Parada</Text>
          <TextInput
            placeholder="Ingrese Detalles"
            multiline={true}
            autoFocus={true}
            selectTextOnFocus={true}
            disableFullscreenUI={true}
            style={styles.textInput3}
          ></TextInput>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header_Registro: {
    height: 39,
    borderWidth: 1,
    borderColor: "rgba(7,252,21,1)",
    backgroundColor: "#fff",
  },
  image1: {
    width: 360,
    backgroundColor: "rgba(15,15, 15,0.0732)",
    height: 679,
    marginTop: 1
  },
  image1_imageStyle: {
    opacity: 0.61
  },
  contenedorDatos1: {
    width: 321,
    height: 608,
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
    marginLeft: 20
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 21,
    width: 21,
    opacity: 0.84,
    height: 21,
    marginLeft: 23
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
  equipo: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 13,
    width: 83,
    opacity: 0.6,
    fontSize: 12,
    marginTop: 32,
    marginLeft: 19
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 31,
    width: 282,
    borderBottomWidth: 1,
    borderColor: "rgba(7,252,21,1)",
    marginTop: 15,
    marginLeft: 19
  },
  tiempoDeParada: {
    fontFamily: "roboto-regular",
    color: "#121212",
    lineHeight: 12,
    opacity: 0.6,
    marginTop: 27,
    marginLeft: 19
  },
  textInput2: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 23,
    width: 113,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(7,252,21,1)",
    opacity: 0.6,
    marginTop: 3
  },
  controlHoras: {
    height: 29,
    width: 94,
    marginLeft: 20
  },
  textInput2Row: {
    height: 29,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 19,
    marginRight: 75
  },
  detalleDeParada: {
    fontFamily: "roboto-regular",
    color: "#121212",
    width: 110,
    height: 17,
    fontSize: 12,
    opacity: 0.6,
    marginTop: 18,
    marginLeft: 19
  },
  textInput3: {
    fontFamily: "roboto-regular",
    color: "#121212",
  
    width: 282,
    borderBottomWidth: 1,
    borderColor: "rgba(7,252,21,1)",
    marginTop: 12,
    marginLeft: 19
  }
});

export default DataEquipoScreen;
