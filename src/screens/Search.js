import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
  } from "react-native";
  import { useState } from "react";
  
  //import diseño
  import { LinearGradient } from "expo-linear-gradient";
  import { Searchbar } from "react-native-paper";
  
  //imports para almacenamiento seguro
  import * as SecureStore from "expo-secure-store";
  import { URL_BASE } from "../config/URL_BASE";
  
  //imports de los componentes
  import BookCard from "../components/BookCard";
  import { Alert } from 'react-native';
  // alertas 
  
  export default function Search({ navigation }) {
    const [page, setPage] = useState(1);
    const [consulta, setConsulta] = useState("");
    const [data, setData] = useState({
      cargado: false,
      results: [],
    });
    const [pages, setPages] = useState(null);
    const onChangeSearch = (query) => setConsulta(query);
    const onPrees = async () => {
      const url = `${URL_BASE}/api/archivo/?page=${page}&search=${consulta}`;
      const token = await SecureStore.getItemAsync("token");
      if (consulta.trim() === "") {
        Alert.alert(
          'ATENCION',
          'Ingrese datos de busqueda.',
          [
            { text: 'ACEPTAR', onPress: () => console.log('Presionado ACEPTAR') },
            
          ]
        );
      } else {
        const request = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        const response = await request.json();
        setPages(response.info.pages);
        setPage(page + 1);
  
        setData({
          cargado: true,
          results: [...results, ...response.results],
        });
      }
    };
    const { cargado, results, info } = data;
    return (
      <>
        <ScrollView>
          <View
            style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18 }}
          ></View>
  
          <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currenHeight }}>
            <View style={styles.buscador}>
              <Searchbar
                placeholder="Buscar"
                onChangeText={onChangeSearch}
                value={consulta}
                onIconPress={() => {
                  setData({
                    cargado:false,
                    results: [],
                  });
                  setPage(1);
                  onPrees();
                }}
              />
            </View>
          </SafeAreaView>
  
          {cargado ? (
            results.length === 0 ? (
              <>
                <Text style={styles.SinR}>Sin resultados</Text>
                <View style={styles.containerImg}>
                  <Image
                    style={styles.img}
                    source={require("../../assets/iconos/sinr.png")}
                  ></Image>
                </View>
              </>
            ) : (
              <>
                {results.map((element) => (
                  <View style={styles.bookCardContainer}>
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
                <View>
                  <TouchableOpacity
                    style={styles.container1}
                    onPress={() => {
                      if (page - 1 === pages) {
                        alert("No hay mas resultados");
                      } else {
                        onPrees();
                      }
                    }}
                  >
                    <LinearGradient
                      colors={["#FFCC00", "#FFCC00", "#FFCC00"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.button}
                    >
                      <Text style={styles.textL}>ver mas resultados</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.container1}
                    onPress={() => {
                      setData({
                        cargado: false,
                        results: [],
                      });
                      setPage(1);
                    }}
                  >
                    <LinearGradient
                      colors={["#FFCC00", "#FFCC00", "#FFCC00"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.button}
                    >
                      <Text style={styles.textL}>Limpiar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    bookCardContainer: {
      width: 200,
      height: 200,
      marginBottom: 30,
      alignContent: "center",
    },
    SinR: {
      fontSize: 20,
      color: "#685B96",
      fontWeight: "bold",
      marginRight: 30,
      marginLeft: 130,
    },
    buscador: {
      padding: 15,
    },
    container1: {
      flex: 1,
      width: 10,
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
    containerImg: {
      width: 50,
      height: 100,
      alignContent: "center",
    },
    img: {
      width: 85,
      height: 85,
      borderWidth: 2,
      resizeMode: "contain",
      marginLeft: 140,
      marginRight: 70,
      marginBottom: 50,
      marginTop: 10,
      alignContent: "center",
    },
  });