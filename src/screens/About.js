import {
    View,
    Image,
    Button,
    Linking,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import { LinearGradient } from "expo-linear-gradient";
  import { URL_BASE } from '../config/URL_BASE';
  export default function About() {
    return (
      <>
        <ScrollView>
          <View style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18 }}></View>
          <View style={styles.containerTI}>
            <Text style={styles.titulo}>ACERCA DE...</Text>
          </View>
          <View style={styles.containerSub}>
            <Text styles={styles.subTitle}>
  
              Bienvenido ala aplicación del repositorio institucional
              del tecnológico Superior de Zongolica con sede en Nogales
              Veracruz.
  
            </Text>
          </View>
          <View style={styles.containerImg}>
            <Image
              style={styles.img}
              source={require('../../assets/ITSZ/LOGO.png')}></Image>
          </View>
          <View style={styles.acerca}>
            <Text>
              El Instituto Tecnológico Superior de Zongolica ahora cuenta con una
              aplicación móvil en la cual los estudiantes podrán consultarla
              información de tesis y proyectos de residencias profesionales.
            </Text>
          </View>
  
          <View style={styles.txt}>
          <Text >Verción de la app 1.0.0</Text>
          </View>
  
          <View style={styles.txt}>
            <Text >Enlace al manuela de usuario de la app. </Text>
          </View>
  
  
          <TouchableOpacity style={styles.container1} onPress={() => Linking.openURL(`${URL_BASE}/media/utils/ManualUsuarioAppRepositorio.pdf`)}>
            <LinearGradient
              colors={["#FFCC00", "#685B96", "#7A4780"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.textL}>MANUAL</Text>
            </LinearGradient>
          </TouchableOpacity>
  
  
  
        </ScrollView>
  
      </>
    );
  }
  const styles = StyleSheet.create({
    titulo: {
      color: '#000',
      fontSize: 45,
      marginTop: 50,
      fontWeight: 'bold',
      marginLeft: 50,
      marginRight: 40,
  
    },
    img: {
      width: 300,
      height: 250,
      borderWidth: 2,
      resizeMode: 'contain',
      marginLeft: 35,
      marginRight: 70,
      marginBottom: 50,
      marginTop: 85,
      alignContent: 'center',
  
    },
  
    subTitle: {
      color: '#fff',
      fontSize: 40,
      marginTop: 20,
      fontWeight: 'bold',
      marginLeft: 80,
      
    },
    containerSub: {
      marginLeft: 30,
      marginRight: 20,
     
    },
    acerca: {
      marginLeft: 30,
      marginRight: 20,
      
      
    },
    containerTI: {
      marginLeft: 10,
      marginRight: 10,
      
    },
    button: {
      margin: 10,
      borderWidth: 1,
      borderColor: "#fff",
      width: "90%",
      height: 45,
      borderRadius: 30,
      padding: 10,
      alignItems: "center",
      marginTop: 30,
      marginLeft:20,
    },
    container1: {
      flex: 1,
      alignItems: "center",
      width: 100,
    },
    textL:{
    fontSize: 15,
      color: "#fff",
      fontWeight: "bold",
    },
    txt:{
      color:"#000",
      marginRight:30,
      marginLeft:30,
      marginTop:10,
    }
  });