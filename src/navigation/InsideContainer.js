import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";


//import para la navegacion 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from '@react-navigation/native';
//imports las pantallas internas
import Home from "../screens/Home";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Admin from "../screens/Admin";



//crear la pila
const Tab = createBottomTabNavigator();
const InsideContainer = () => {
  const route = useRoute();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    if (route.params?.staff) {
      setStaff(route.params.staff);
    }
  }, [route.params]);
  
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          showLabel: false,
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <Image
                  source={require("../../assets/iconos/casa.png")}
                  resizeMode="contain"
                  style={{
                    width: 31,
                    height: 31,
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Text>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <Image
                  source={require("../../assets/iconos/lupa.png")}
                  resizeMode="contain"
                  style={{
                    width: 31,
                    height: 31,
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Buscar
                </Text>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <Image
                  source={require("../../assets/iconos/usuario.png")}
                  resizeMode="contain"
                  style={{
                    width: 31,
                    height: 31,
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Perfil
                </Text>
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 0,
                }}
              >
                <Image
                  source={require("../../assets/iconos/information.png")}
                  resizeMode="contain"
                  style={{
                    width: 31,
                    height: 31,
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Info
                </Text>
              </View>
            ),
            headerShown: false,
          }}
        />

        {staff === true && (
          <Tab.Screen
            name="Admin"
            component={Admin}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 0,
                  }}
                >
                  <Image
                    source={require("../../assets/iconos/admin.png")}
                    resizeMode="contain"
                    style={{
                      width: 31,
                      height: 31,
                    }}
                  />
                  <Text
                    style={{
                      color: focused ? "#e32f45" : "#748c94",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Admin
                  </Text>
                </View>
              ),
              headerShown: false,
            }}
          />
        )}
      </Tab.Navigator>
    </>
  );
}
export default InsideContainer

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowffset: {
      with: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});