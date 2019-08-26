import React from "react";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Login from "./src/components/screens/Login";
import Register from "./src/components/screens/Register";
import Questions from "./src/components/screens/Questions";
import Result from "./src/components/screens/Result";
import AsyncStorage from "@react-native-community/async-storage";
import AnswerDetails from "./src/components/screens/AnswerDetails";
import Profile from "./src/components/screens/Profile";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";
//TODO: use the game theory
let a = async () => await AsyncStorage.clear();
a();

const AuthNavigator = createSwitchNavigator({
  Login: createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        headerTransparent: true
      }
    }
  }),
  Questions: createSwitchNavigator({
    Questions,
    Results: {
      screen: createStackNavigator({
        Result: {
          screen: createMaterialBottomTabNavigator(
            {
              Result: createStackNavigator(
                {
                  Result: {
                    screen: Result,
                    navigationOptions: {
                      header: null
                    }
                  }
                },
                {
                  navigationOptions: {
                    title: "Result",
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name={"md-medal"} size={30} color={tintColor} />
                    )
                  }
                }
              ),
              Profile: createStackNavigator(
                {
                  Profile: {
                    screen: Profile,
                    navigationOptions: {
                      header: null
                    }
                  }
                },
                {
                  navigationOptions: {
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="md-person" size={30} color={tintColor} />
                    )
                  }
                }
              )
            },
            {
              activeColor: "#fff",
              inactiveColor: "#aaa",
              barStyle: {
                backgroundColor: "grey"
              }
            }
          ),
          navigationOptions: {
            headerTitle: (
              <Text style={{ color: "white", fontSize: 25, paddingLeft: 20 }}>
                <Text
                  style={{
                    fontFamily: "Harlow Solid Regular"
                  }}
                >
                  Honest
                </Text>{" "}
                Carrot
              </Text>
            ),
            headerStyle: { backgroundColor: "grey" }
          }
        },
        AnswerDetails: {
          screen: AnswerDetails,
          navigationOptions: {
            headerTransparent: true
          }
        }
      })
    }
  })
});

export default createAppContainer(AuthNavigator);
