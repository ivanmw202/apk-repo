import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Button,
    Image,
    Alert,
    Linking,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { useEffect, useState, useCallback } from "react";
  
  //imports de secure store
  import * as SecureStore from "expo-secure-store";
  
  //iports de diseño
  import { LinearGradient } from "expo-linear-gradient";
  
  //imports de componenetes
  import { URL_BASE } from "../config/URL_BASE";
  import Loading from "../components/Loading";
  
  export default function BookDetail({ route }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const id = route.params.id;
    const getLibro = async () => {
      let token = await SecureStore.getItemAsync("token");
      const url = `${URL_BASE}/api/archivo/${id}`;
      const solicitud = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      const respuesta = await solicitud.json();
      console.log(respuesta);
      setLoading(false);
      setData(respuesta);
    };
    useEffect(() => {
      //use efect para que cuando se carge el componentete se ejecute la funcion posFata
      getLibro();
    }, []);
    //
  
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View
              style={{ backgroundColor: "#FFCC00", padding: 18, width: 400, }}
            ></View>
            
            <View style={styles.containerImg}>
              <Image
                style={styles.img}
                source={require("../../assets/ITSZ/largo.png")}
              ></Image>
            </View>
            <View style={styles.container}>
              <Text style={styles.titulo}>TITULO: {data.titulo} </Text>
              <Text>Resumen: {data.resumen} </Text>
              <Text style={styles.materia}>Materia: {data.materia} </Text>
              <Text style={styles.autor}>Autor: {data.autor}</Text>
              <Image style={styles.imagen} source={{ uri: data.imagen }} />
              <OpenURLButton url={data.pdf}></OpenURLButton>
            </View>
          </>
  
        )}
      </>
    );
  }
  
  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (
      <TouchableOpacity style={styles.container1} onPress={handlePress}>
        <LinearGradient
          colors={["#FFCC00", "#685B96", "#7A4780"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.textL}>DESCARGAR LIBRO</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 5,
      borderRadius: 15,
      borderWidth: 5,
      width: "90%",
      marginLeft: 20,
      padding: 10,
      height: 2,
      marginBottom: 50,
      backgroundColor: "#f1f1f1",
    },
    imagen: {
      width: 150,
      height: 150,
      borderWidth: 1,
      borderColor: "#000",
      margin: 30,
      borderRadius: 10,
    },
    titulo: {
      color: "#000",
      fontSize: 30,
      marginTop: 50,
      fontWeight: "bold",
      
    },
    materia: {
      color: "#000",
      fontSize: 30,
      marginTop: 20,
      fontWeight: "bold",
    },
    autor: {
      color: "#000",
      fontSize: 30,
      marginTop: 20,
      fontWeight: "bold",
    },
  
    container1: {
      flex: 1,
      alignItems: "center",
      width: 100,
    },
    button: {
      margin: 120,
      borderWidth: 1,
      borderColor: "#fff",
      width: "90%",
      height: 45,
      borderRadius: 30,
      padding: 10,
      alignItems: "center",
      marginTop: 30,
    },
    textL: {
      fontSize: 15,
      color: "#fff",
      fontWeight: "bold",
    },
    containerImg: {
      marginHorizontal: 50,
      length: 20,
      right: 80,
    },
    img: {
      width: 300,
      height: 90,
      borderWidth: 1,
      resizeMode: "contain",
      marginLeft: 80,
      marginRight: 90,
      alignContent: "center",
      marginTop: 15,
    },
  });