import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity, 
  ScrollView
} from "react-native";
import Header from "../../../../components/Header";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styleEventoCausa'


function EventoCausaScreen(props) {
  return (
    
      <><View style={[styles.container1, props.style]}>
      <View style={styles.leftWrapper}>
        <TouchableOpacity style={styles.leftIconButton}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Icon name="ios-arrow-back" style={styles.leftIcon}

          ></Icon>
          <Text style={styles.leftText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.ingresoDeDatos}>
          Ingreso de Datos
        </Text>
      </View>
      <View style={styles.rightWrapper}>
        <TouchableOpacity style={styles.rightIconButton}></TouchableOpacity>
      </View>
    </View><ScrollView style={styles.container}>
        <ImageBackground
          source={require("../../../../assets/images/T2MDYDINPBHWNGA76MRDJARKGA1.jpg")}
          resizeMode="cover"
          style={styles.image1}
          imageStyle={styles.image1_imageStyle}
        >
          <View style={styles.contenedorDatos1}>
            <Text style={styles.evento}>Evento</Text>
            <TextInput
              placeholder="Ingrese Detalles"
              style={styles.textInput}
            ></TextInput>
            <Text style={styles.causas}>Causas</Text>
            <TextInput
              placeholder="Ingrese Detalles"
              style={styles.textInput}
            ></TextInput>
          </View>
        </ImageBackground>
      </ScrollView></>
  );
}


export default EventoCausaScreen; 