import React, { Component, useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,

    ActivityIndicator,
    Alert,
    Image,
    LogBox,
    TextInput
} from "react-native";

import axios from "axios"
import { getTroubleShootingById, putTroubleshootingUpdate, deleteTroubleshootingById } from '../../services/api';
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthContext } from "../../Context/authState";
import { format } from "date-fns";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function ReporteDetalle(props) {

    const { token } = useContext(AuthContext)
    console.log(token)

    const [estadoAlertModificar, setEstadoAlertModificar] = useState(false);
    const [estadoAlertDelete, setEstadoAlertDelete] = useState(false);
    const showAlertModificar = () => {
        setEstadoAlertModificar(true);
    };
    const hideAlertModificar = () => {
        setEstadoAlertModificar(false);
    };

    const showAlertDelete = () => {
        setEstadoAlertDelete(true);
    };
    const hideAlertDelete = () => {
        setEstadoAlertDelete(false);
    };


    const [formulario, setFormulario] = useState({
        // event: "",
        // date: "",
        // description: "",
        // attributed_cause: "",
        // superintendent: "",
        // supervisor: "",
        // operators: "",
        // downtime: "",
        // details: "",
        // take_actions: "",
        // equipment:'',
        // results: "",
        // equipment_id: "",
        // attachments: '',
        // password: ""
    })

    const [hora, setHora] = useState(new Date())
    // const [data, setData] = useState([])
    const [estado, setEstado] = useState(false)

    const getDataByID = () => {
        startLoading()
        const idUrl = props.route.params.id;
        getTroubleShootingById(idUrl, token).then(rpta => {
            setFormulario(rpta.data.data)
            setLoading(false)
        })
    }
    const navigation = useNavigation();
    useEffect(() => {

        getDataByID()
    }, [])


    const handleSubmit = () => {

        putTroubleshootingUpdate(token, formulario, props.route.params.id).then((rpta) => {

            if (rpta.status === 200) {
                console.warn("Subida extitosa")
                navigation.goBack()
            } else {
                console.warn("Subida errónea")

            }
        }).catch(err => {
            console.log("ERROR EN EL SERVICIO CREARDATA")
            console.warn(err)
        })
    }

    const handleChangeText = (nombre, value) => {
        setFormulario({ ...formulario, [nombre]: value })

    };

    const edit = () => {
        setEstado(true)
    }

    const eliminarTroubleshooting = id => {
        deleteTroubleshootingById(props.route.params.id, token).then((rpta) => {
            if (rpta.status === 200) {
                //Se comprueba que se eliminó correctamente
                props.route.params.traerTroubles()
                navigation.goBack() //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario

            }
        })
    }

    var fechaDetalle = new Date(formulario?.date)




    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <>

            <ScrollView style={styles.container}>
                {loading ? (
                    <ActivityIndicator
                        //visibility of Overlay Loading Spinner
                        visible={loading}
                        //Text with the Spinner
                        size="large"
                        color="#f4c47c"
                        //Text style of the Spinner Text
                        textStyle={styles.spinnerTextStyle}
                    />
                ) : (
                    <>
                        {/* <ImageBackground
                source={require("../../../assets/images/T2MDYDINPBHWNGA76MRDJARKGA1.jpg")}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <View style={styles.rect}> */}
                        <Text style={styles.tituloIncidente}>{formulario.event}</Text>
                        <Text style={styles.fechaTag1}>Fecha y Hora</Text>
                        <TextInput style={styles.fecha2}
                            value={fechaDetalle?.getDate() + '/' + (fechaDetalle?.getMonth() + 1) + '/' + fechaDetalle?.getFullYear()}
                            editable={false}
                            onChangeText={(value) => handleChangeText('date', value)}
                        ></TextInput>
                        <Text style={styles.horaTag1}>Hora</Text>
                        <TextInput style={styles.hora2}
                            value={fechaDetalle?.getHours() + ':' + fechaDetalle?.getMinutes()}
                            editable={false}
                            onChangeText={(value) => handleChangeText('date', value)}
                        ></TextInput>
                        <Text style={styles.supeintendente1}>Supeintendente</Text>
                        <TextInput style={styles.superintendenteEntrada}
                            value={formulario.superintendent}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('superintendent', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.supervisores1}>Supervisores</Text>
                        <TextInput style={styles.ingreseSupervisores}
                            value={formulario.supervisor}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('supervisor', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.operadores1}>Operadores</Text>
                        <TextInput style={styles.ingreseOperadores}
                            value={formulario.operators}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('operators', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.equipo1}>Equipo</Text>
                        <TextInput style={styles.ingreseEquipo}
                            editable={false}
                            multiline={true}
                            value={formulario.equipment?.name}
                        ></TextInput>
                        <Text style={styles.tiempoDeParada}>Tiempo de parada (horas)</Text>
                        <TextInput style={styles.horas}
                            value={formulario.downtime}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('downtime', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.detalleDeParada1}>Detalle de Parada</Text>
                        <TextInput style={styles.ingreseDetalles}
                            value={formulario.details}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('details', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.evento}>Evento</Text>
                        <TextInput style={styles.detallesEvento}
                            value={formulario.event}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('event', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.evento}>Descripción del evento</Text>
                        <TextInput style={styles.detallesEvento}
                            value={formulario.description}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('description', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.causa}>Causa</Text>
                        <TextInput style={styles.detallesCausa}
                            value={formulario.attributed_cause}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('attributed_cause', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.accionesTomadas}>Acciones Tomadas</Text>
                        <TextInput style={styles.accionesDetalle}
                            value={formulario.take_actions}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('take_actions', value)}
                            editable={estado}
                        ></TextInput>
                        <Text style={styles.resultados}>Resultados</Text>
                        <TextInput style={styles.resultadosDetalle}
                            value={formulario.results}
                            multiline={true}
                            onChangeText={(value) => handleChangeText('results', value)}
                            editable={estado}
                        ></TextInput>
                        {/* <Text style={styles.conclusiones}>Conclusiones</Text>
                    <TextInput style={styles.conclusionesDetalle}
                        value={formulario.conclusiones}
                        onChangeText={(value) => handleChangeText('conclusiones', value)}
                        editable={estado}
                    ></TextInput>
                    <Text style={styles.detallesDeCapturas}>Detalles de capturas</Text>
                    <TextInput style={styles.detallesDeLaFotos}
                        value={formulario.evidenciaDetalle}
                        onChangeText={(value) => handleChangeText('evidenciaDetalle', value)}
                        editable={estado}
                    ></TextInput> */}
                        <View style={styles.imagen_1}>{!!formulario.attachments && (
                            <Image source={{ uri: formulario.attachments[0]?.url }}
                                style={{
                                    width: 310,
                                    height: 210,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    opacity: 0.9,
                                }} />)}
                        </View>
                        <View style={styles.imagen_2}>{!!formulario.attachments && (
                            <Image source={{ uri: formulario.attachments[1]?.url }}
                                style={{
                                    width: 310,
                                    height: 210,
                                    marginLeft: 20,
                                    marginRight: 20,
                                    opacity: 0.9,
                                }} />)}
                        </View>

                        {/* </View> */}
                        <AwesomeAlert
                            show={estadoAlertModificar}
                            showProgress={false}
                            title="Modificación en Curso"
                            titleStyle={{ fontSize: 22, marginBottom: 10 }}
                            messageStyle={{ fontSize: 18, marginBottom: 10 }}
                            message="¿Desea guardar los cambios?"
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="No"
                            confirmText="Si"
                            cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10 }}
                            confirmButtonStyle={{ width: 100, alignItems: 'center' }}
                            confirmButtonColor="#AEDEF4"
                            cancelButtonColor="#DD6B55"
                            onCancelPressed={() => {
                                hideAlertModificar();
                            }}
                            onConfirmPressed={() => {
                                handleSubmit()
                                hideAlertModificar();
                            }}
                        />
                        <AwesomeAlert
                            show={estadoAlertDelete}
                            showProgress={false}
                            title="Eliminación en curso"
                            titleStyle={{ fontSize: 22, marginBottom: 10 }}
                            messageStyle={{ fontSize: 18, marginBottom: 10 }}
                            message="¿Está seguro que desea eliminar?"
                            closeOnTouchOutside={true}
                            closeOnHardwareBackPress={false}
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="No"
                            confirmText="Si"
                            cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10 }}
                            confirmButtonStyle={{ width: 100, alignItems: 'center' }}
                            confirmButtonColor="#AEDEF4"
                            cancelButtonColor="#DD6B55"
                            onCancelPressed={() => {
                                hideAlertDelete();
                            }}
                            onConfirmPressed={() => {
                                eliminarTroubleshooting();
                                hideAlertDelete();
                            }}
                        />
                        {/* </ImageBackground> */}

                    </>
                )}
            </ScrollView >
            <View style={{ flexDirection: "row", position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                {estado ?
                    (<TouchableOpacity
                        style={[styles.containerCambios, styles.guardarDataReporte]}
                        onPress={() => showAlertModificar()}>
                        <FontAwesomeIcon name="save" style={styles.icon}></FontAwesomeIcon>
                    </TouchableOpacity>) :
                    (<TouchableOpacity
                        style={[styles.containerCambios, styles.guardarDataReporte]}
                        onPress={() => edit()}>
                        <FontAwesomeIcon name="edit" style={styles.icon}></FontAwesomeIcon>
                    </TouchableOpacity>)
                }<TouchableOpacity
                    style={[styles.containerCambios, styles.guardarDataReporte]}
                    onPress={() => showAlertDelete()}>
                    <FontAwesomeIcon name="trash" style={styles.icon2}></FontAwesomeIcon>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.containerCambios, styles.guardarDataReporte]}
                    onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon name="reply" style={styles.icon3}></FontAwesomeIcon>
                </TouchableOpacity>
            </View>


        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 21,
        shadowOpacity: 0.41,
        marginBottom: 45
    },
    rect: {
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
        marginBottom: 25,
        marginTop: 30,
        marginRight: 10,
        marginLeft: 10
    },
    icon: {
        color: 'green',
        fontSize: 24,
        marginTop: 10
    },
    icon2: {
        color: 'red',
        fontSize: 24,
        marginTop: 10

    },
    icon3: {
        color: 'blue',
        fontSize: 24,
        marginTop: 10
    },
    tituloIncidente: {
        color: "#121212",
        fontSize: 26,
        textAlign: "center",
        marginTop: 35,
        marginBottom: 10,
        alignSelf: "center"
    },
    fechaTag1: {

        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    fecha2: {
        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19

    },
    horaTag1: {

        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    hora2: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    supeintendente1: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    superintendenteEntrada: {
        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    supervisores1: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    ingreseSupervisores: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    operadores1: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    ingreseOperadores: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    equipo1: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    ingreseEquipo: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    tiempoDeParada: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    horas: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        width: 83,
        marginLeft: 19,
        textAlign: "center",
    },
    detalleDeParada1: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    ingreseDetalles: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    evento: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    detallesEvento: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    causa: {
        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    detallesCausa: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    accionesTomadas: {

        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    accionesDetalle: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    resultados: {

        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    resultadosDetalle: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    conclusiones: {

        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    conclusionesDetalle: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    detallesDeCapturas: {

        color: "#121212",
        opacity: 0.8,
        fontSize: 16,
        marginTop: 20,
        marginLeft: 19
    },
    detallesDeLaFotos: {

        color: "#696969",
        borderBottomWidth: 1,
        borderColor: "rgba(1,123,146,255)",
        marginTop: 15,
        marginRight: 19,
        marginLeft: 19
    },
    imagen_1: {
        marginTop: 25,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center'
    },
    imagen_2: {
        marginTop: 25,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 30,
        alignItems: 'center'
    },
    guardarDataReporte: {
        height: 55,
        width: 55,
    },
    containerBotonGuardar: {
        backgroundColor: "rgba(1,123,146,1)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,
    },
    containerEliminar: {
        backgroundColor: "#DD6B55",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 2,

    },
    containerCambios: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        marginLeft: 12,
    },
    guardarReporte: {
        color: "#fff",
        fontSize: 14
    },
    image: {
        backgroundColor: "rgba(15,15, 15,0.0732)",
        marginTop: 1
    },
    image_imageStyle: {
        opacity: 0.61
    },
});

