import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const Admin = ({navigation}) => {
  return (
    <>
      <View style={styles.contenedorP}>
        <ScrollView>

          <View style={{ backgroundColor: "#FFCC00", flex: 1, padding: 18, height: 18, }}></View>
          <View style={styles.containerIm}>
            <Image
              style={styles.img}
              source={require("../../assets/ITSZ/LargoB.jpg")}
            ></Image>
          </View>
          <View style={styles.containersub}>
            <Text style={styles.titulo}>SITIO DE AMINISTRADOR.</Text>
          </View>
          <TouchableOpacity
            style={styles.containerR}
            onPress={() => {
              navigation.navigate("AddFile");
            }}
          >
            <LinearGradient
              colors={["#FFCC00", "#685B96", "#7A4780"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonR}
            >
              <Text style={styles.textL}>Agregar documento</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerR}
            onPress={() => {
              navigation.navigate("AddAutor");
            }}
          >
            <LinearGradient
              colors={["#FFCC00", "#685B96", "#7A4780"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonR}
            >
              <Text style={styles.textL}>Agregar autores</Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </>
  );
};

export default Admin;

const styles = StyleSheet.create({
  titulo: {
    color: "#000",
    fontSize: 30,
    marginTop: 20,
    fontWeight: "bold",
    marginRight:20,
    marginLeft:30,
  },
  containersub:{
    marginBottom:60,
  },
  img: {
    width: 350,
    height: 350,
    borderWidth: 2,
    resizeMode: 'contain',
    marginLeft: 30,
    marginRight: 90,
    marginBottom: 50,
    marginTop: 30,
    alignContent: 'center',
    height: 50,
  },
  containerIm: {
    marginLeft: 70,
    marginRight: 70,
  },
  contenedorP: {
    backgroundColor: '#fff',
    flex:1,
    
  },
  containerR: {
    flex: 1,
    alignItems: "center",
    width: 400,
  },
  buttonR: {
    margin: 100,
    borderWidth: 1,
    borderColor: "#fff",
    width: "47%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textL: {
    fontSize: 15,
    color: "#fff",
  },
});