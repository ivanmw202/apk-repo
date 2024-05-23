import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

//imports para diseño
import { LinearGradient } from "expo-linear-gradient";

//imports de almacenamiento seguro
import * as SecureStore from "expo-secure-store";

//import url base
import { URL_BASE } from "../config/URL_BASE";

//imports de los conponentes 
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import { Alert } from 'react-native';
// alertas 

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(null);

  const getLibros = async () => {
    let token = await SecureStore.getItemAsync("token");
    const URL = `${URL_BASE}/api/archivo/?page=${page}`;
    const solicitud = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const respuesta = await solicitud.json();
    setPages(respuesta.info.pages);

    setPage(page + 1);

    setLoading(false);
    setData((data) => [...data, ...respuesta.results]);
  };
  const getInfo = async () => {
    let token = await SecureStore.getItemAsync("token");
    const URL = `${URL_BASE}/api/auth/users/me/`;
    const solicitud = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });

    const respuesta = await solicitud.json();
    console.log(JSON.stringify(respuesta.last_name));
    await SecureStore.setItemAsync("nombre", respuesta.first_name);
    await SecureStore.setItemAsync("apellido_paterno", respuesta.last_name);
    await SecureStore.setItemAsync(
      "apellido_materno",
      respuesta.apellido_materno
    );
    await SecureStore.setItemAsync("matricula", respuesta.matricula);
  };
  useEffect(() => {
    //use efect para que cuando se carge el componentete se ejecute la funcion posFata
    getLibros();
    getInfo();
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <ScrollView style={styles.pnt}>
      <View style={styles.screen}>
        <View
          style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18 }}
        ></View>
        <View style={styles.contenedorP}>
          <View style={styles.containerIm}>
            <Image
              style={styles.img}
              source={require("../../assets/ITSZ/LargoB.jpg")}
            ></Image>
          </View>

          {data.map((element) => (
            <View key={element.id} style={styles.bookCardContainer}>
              <BookCard
                key={element.id}
                id={element.id}
                titulo={element.titulo}
                imagen={element.imagen}
                materia={element.materia}
                navigation={navigation}
              />
            </View>
          ))}

          <View style={styles.btnShowMore}>
          <TouchableOpacity
            style={styles.container1}
            onPress={() => {
              if (page - 1 === pages) {
                Alert.alert(
                  'SIN LIBROS',
                  'No hay mas resultados',
                  [
                    { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
                    
                  ]
                );
              } else {
                getLibros();
              }
            }}
          >
            <LinearGradient
              colors={["#FFCC00", "#FFCC00", "#FFCC00"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.textL}>ver mas libros</Text>
            </LinearGradient>
          </TouchableOpacity>
          </View>
        </View>
        </View>
      </ScrollView>
      
    </>
  );
}

const styles = StyleSheet.create({
  pnt:{
    flex:1,
    backgroundColor:"#FFF",
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  bookCardContainer: {
    width: 200,
    height: 200,
    marginBottom: 30,
    alignContent: "center",
  },
  container1: {
    flex: 1,
    width: 200,
  },
  button: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#fff",
    width: "90%",
    height: 35,
    borderRadius: 30,
    padding: 5,
    alignItems: "center",
    marginTop: 10,
  },
  textL: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
  containerIm: {
    marginHorizontal: 50,
    length: 20,
    right: 80,
  },
  img: {
    width: 300,
    height: 90,
    borderWidth: 1,
    resizeMode: "contain",
    marginLeft: 60,
    marginRight: 90,
    alignContent: "center",
    marginTop: 15,
  },
  contenedorP: {
    backgroundColor: "#FFF",
  },
  btnShowMore:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});