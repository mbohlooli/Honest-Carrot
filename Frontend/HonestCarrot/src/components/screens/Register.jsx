import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import DefaultInput from "../common/DefaultInput";
import DefaultButton from "../common/DefaultButton";
import DefaultSelect from "../common/DefaultSelect";
import Background from "../../../assets/Login.jpg";

class Register extends Component {
  state = {
    confirmPasswordTouched: false,
    controls: {
      name: {
        value: "",
        valid: false,
        rules: {
          minLength: 3
        }
      },
      email: {
        value: "",
        valid: false,
        rules: {
          isEmail: true
        }
      },
      city: {
        value: "",
        valid: false,
        rules: {
          minLength: 2
        }
      },
      age: {
        value: "",
        valid: false,
        rules: {
          min: 5
        }
      },
      password: {
        value: "",
        valid: false,
        rules: {
          minLength: 8
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        rules: {
          equals: "password"
        }
      },
      gender: {
        value: 0
      }
    }
  };

  submitValue(key, value) {
    const { controls, confirmPasswordTouched } = this.state;

    var connectedValue = {};

    if (controls[key].rules.equals) {
      const equalControl = controls[key].rules.equals;
      const equalValue = controls[equalControl].value;
      connectedValue = { ...connectedValue, equals: equalValue };
    }

    if (key === "password")
      connectedValue = { ...connectedValue, equals: value };
    else if (key === "confirmPassword")
      this.setState({ confirmPasswordTouched: true });

    this.setState({
      controls: {
        ...controls,
        confirmPassword: {
          ...controls.confirmPassword,
          valid:
            key === "password"
              ? validate(
                  controls.confirmPassword.value,
                  controls.confirmPassword.rules,
                  connectedValue
                )
              : controls.confirmPassword.valid,
          touched: confirmPasswordTouched
        },
        [key]: {
          ...controls[key],
          value,
          valid: validate(value, controls[key].rules, connectedValue)
        }
      }
    });
  }

  handleGenderSelect = gender =>
    this.setState({
      controls: {
        ...this.state.controls,
        gender: {
          ...this.state.controls.gender,
          value: gender,
          touched: true
        }
      }
    });

  register = async () => {
    const { email, name, city, gender, age, password } = this.state.controls;
    try {
      await axios.post("http://192.168.2.1:8000/register", {
        email: email.value,
        name: name.value,
        city_id: city.value,
        age: age.value,
        password: password.value,
        gender: gender.value
      });

      let res = await axios.post("http://192.168.2.1:8000/login", {
        email: email.value,
        password: password.value
      });
      let token = res.data;
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("email", email.value);
      await AsyncStorage.setItem("password", password.value);

      this.props.navigation.navigate("Questions");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      name,
      email,
      age,
      city,
      password,
      confirmPassword,
      gender
    } = this.state.controls;

    return (
      <ImageBackground source={Background} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Register</Text>
          </View>
          <View style={{ width: "100%", paddingLeft: "10%" }}>
            <Text style={{ color: "#000" }}>
              Create a <Text style={styles.AppName}>Honest</Text>{" "}
              <Text style={{ fontWeight: "bold" }}>Carrot</Text> account
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.inputGroup}>
                <DefaultInput
                  style={{ flex: 3, marginRight: 2 }}
                  onChangeText={name => this.submitValue("name", name)}
                  value={name.value}
                  valid={name.valid}
                  placeholder="Full name"
                />
                <DefaultSelect
                  style={{ marginLeft: 2 }}
                  flex={2}
                  selectedValue={gender.value}
                  onValueChange={this.handleGenderSelect}
                  items={[
                    { value: 0, label: "Male" },
                    { value: 1, label: "Female" }
                  ]}
                  placeholder="Gender"
                />
              </View>
              <DefaultInput
                onChangeText={email => this.submitValue("email", email)}
                value={email.value}
                valid={email.valid}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <DefaultInput
                onChangeText={password =>
                  this.submitValue("password", password)
                }
                value={password.value}
                valid={password.valid}
                placeholder="Password"
                secureTextEntry={true}
              />
              <DefaultInput
                onChangeText={confirmPassword =>
                  this.submitValue("confirmPassword", confirmPassword)
                }
                value={confirmPassword.value}
                valid={confirmPassword.valid}
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
              <View style={styles.inputGroup}>
                <DefaultInput
                  style={{ flex: 1, marginRight: 2 }}
                  onChangeText={city => this.submitValue("city", city)}
                  value={city.value}
                  valid={city.valid}
                  placeholder="City"
                />
                <DefaultInput
                  style={{ flex: 1, marginLeft: 2 }}
                  onChangeText={age => this.submitValue("age", age)}
                  value={age.value}
                  valid={age.valid}
                  placeholder="Age"
                  keyboardType="number-pad"
                />
              </View>
              <View style={styles.submitButton}>
                <DefaultButton
                  title="Register"
                  color="#0085ea"
                  disabled={
                    !name.valid ||
                    !email.valid ||
                    !city.valid ||
                    !age.valid ||
                    !password.valid ||
                    !confirmPassword.valid
                  }
                  onPress={this.register}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black"
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50
  },
  form: {
    width: "100%",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%",
    paddingTop: 10
  },
  submitButton: {
    marginTop: 10,
    width: "80%",
    alignSelf: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputGroup: {
    width: "100%",
    flexDirection: "row"
  },
  AppName: {
    fontFamily: "Harlow Solid Regular"
  }
});
