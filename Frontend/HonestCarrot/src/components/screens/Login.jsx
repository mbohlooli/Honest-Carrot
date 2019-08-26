import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import validate from "../../validation";
import DefaultInput from "../common/DefaultInput";
import DefaultButton from "../common/DefaultButton";
import Background from "../../../assets/Login.jpg";
import Spiner from "react-native-spinkit";
import AsyncStorage from "@react-native-community/async-storage";
import jwt from "react-native-pure-jwt";
import axios from "axios";

class Login extends Component {
  state = {
    isLoggingIn: false,
    load: false,
    controls: {
      email: {
        value: "",
        valid: false,
        rules: {
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        rules: {
          minLength: 8
        }
      }
    }
  };

  async componentDidMount() {
    if (await AsyncStorage.getItem("loggedIn")) {
      try {
        this.setState({ isLoggingIn: true });
        let res = await axios.post(
          "http://192.168.2.1:8000/login",
          {
            email: await AsyncStorage.getItem("email"),
            password: await AsyncStorage.getItem("password")
          },
          { headers: { "Content-Type": "application/json" } }
        );
        let token = res.data;
        await AsyncStorage.setItem("token", token);
        this.props.navigation.navigate("Questions");
      } catch (error) {
        this.setState({ isLoggingIn: false });
        console.log(error);
      }
    } else this.setState({ load: true });
  }

  submitValue(key, value) {
    const { controls } = this.state;

    this.setState({
      controls: {
        ...controls,
        [key]: {
          ...controls[key],
          value,
          valid: validate(value, controls[key].rules)
        }
      }
    });
  }

  login = async () => {
    const { email, password } = this.state.controls;
    try {
      this.setState({ isLoggingIn: true });
      let res = await axios.post(
        "http://192.168.2.1:8000/login",
        {
          email: email.value,
          password: password.value
        },
        { headers: { "Content-Type": "application/json" } }
      );
      let token = res.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("email", email.value);
      await AsyncStorage.setItem("password", password.value);
      this.props.navigation.navigate("Questions");
    } catch (error) {
      this.setState({ isLoggingIn: false });
      console.error(error);
    }
  };

  render() {
    const { email, password } = this.state.controls;

    if (this.state.isLoggingIn || !this.state.load) {
      return (
        <View style={styles.blank}>
          <Spiner size={75} color="#48addb" type="Wave" />
        </View>
      );
    }

    return (
      <ImageBackground source={Background} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.title}>
              <Text style={styles.AppName}>Honest</Text> Carrot
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <DefaultInput
                onChangeText={email => this.submitValue("email", email)}
                value={email.value}
                valid={email.valid}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <DefaultInput
                onChangeText={password =>
                  this.submitValue("password", password)
                }
                value={password.value}
                valid={password.valid}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize="none"
                marginBottom={0}
              />
              <View style={styles.submitButton}>
                <DefaultButton
                  title="Login"
                  color="#0085ea"
                  disabled={!email.valid || !password.valid}
                  onPress={this.login}
                />
              </View>

              <View
                style={{
                  margin: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row"
                }}
              >
                <Text style={{ color: "#000" }}>
                  Don't have an account yet?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Register")}
                >
                  <Text style={styles.link}>Sign up </Text>
                </TouchableOpacity>
                <Text style={{ color: "#000" }}>now</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 50,
    color: "#4e5257",
    padding: 0,
    paddingTop: 50
  },
  AppName: {
    fontFamily: "Harlow Solid Regular"
  },
  inputContainer: {
    width: "80%",
    paddingTop: 60
  },
  submitButton: {
    marginTop: 10
  },
  link: {
    alignItems: "center",
    justifyContent: "center",
    color: "#3b81cc"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  blank: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
