import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  
  export default function BookCard({ navigation, imagen, titulo, materia, id }) {
    return (
      <View style={styles.container}>
        <View>
          <View>
            <Image style={styles.imagen} source={{ uri: imagen }} />
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.titulo}>{materia}</Text>
          
  
            <TouchableOpacity
              style={styles.contenedorB}
              onPress={() => {
                navigation.navigate('Detail', { id: id });
              }}>
              <LinearGradient
                colors={['#FFCC00', '#685B96', '#7A4780']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button1}>
                <Text style={styles.textL}>vermas...</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    imagen: {
      width: 100,
      height: 100,
      marginLeft: 90,
    },
    container: {
      
      borderWidth: 1,
      width: '300',
      borderRadius: 15,
      padding: 0,
      paddingStart: 10,
      marginBottom: 30,
      marginTop: 15,
      marginLeft: 30,
    },
    contenedorB: {
      flex: 1,
      alignItems: 'center',
      width: 200,
    },
    button1: {
      margin: 10,
      borderWidth: 1,
      borderColor: '#fff',
      width: '90%',
      height: 45,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      marginTop: 3,
    },
    textL: {
      fontSize: 15,
      color: '#fff',
      fontWeight: 'bold',
    },
    titulo: {
      color: "#000",
      fontSize: 15,
      marginTop: 1,
      fontWeight: "bold",
    },
  });
  