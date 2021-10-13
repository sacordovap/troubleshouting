import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class HistorialReportesScreen extends React.Component {
  render() {
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
      </View><View style={styles.container}>
          <Text>Aqui va el codigo de vista</Text>
        </View></>
    );
  }
}

//Esto se debe de importar desde styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroups: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        alignItems: "center",
        borderBottomColor: '#cccccc'
    }
});

export default HistorialReportesScreen;