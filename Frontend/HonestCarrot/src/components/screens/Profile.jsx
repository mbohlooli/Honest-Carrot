import React, { Component } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import Spiner from "react-native-spinkit";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import Background from "../../../assets/Login.jpg";

class Profile extends Component {
  state = { user: {} };

  async componentDidMount() {
    let user = (await axios.get(
      "http://192.168.2.1:8000/profile?token=" +
        (await AsyncStorage.getItem("token"))
    )).data;
    this.setState({ user });
    console.log(this.state.user);
  }

  render() {
    const { user } = this.state.user;

    if (!user) {
      return (
        <View style={styles.blank}>
          <Spiner size={75} color="#48addb" type="Wave" />
        </View>
      );
    }

    let correctPercent = Math.round(
      (this.state.user.CorrectAnswers / this.state.user.AnsweredQuestions) * 100
    );

    let wrongPercent = Math.round(
      (this.state.user.WrongAnswers / this.state.user.AnsweredQuestions) * 100
    );

    return (
      <ImageBackground
        source={Background}
        style={{ widht: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 15 }}>
              from{" "}
              {user.city.name.charAt(0).toUpperCase() + user.city.name.slice(1)}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "#aaa",
              marginTop: 10
            }}
          />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Email: {user.email}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Age: {user.age}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Gender: {user.gender == 0 ? "Male" : "Female"}
            </Text>
            <Text style={{ fontSize: 20, marginVertical: 5 }}>
              Total answers: {this.state.user.AnsweredQuestions}
            </Text>
          </View>
          <Text style={{ fontSize: 20, marginTop: 20, marginBottom: 5 }}>
            Accuracy:
          </Text>
          <View
            style={{
              width: "100%",
              height: 3,
              flexDirection: "row",
              marginTop: 5
            }}
          >
            <View
              style={{
                width: correctPercent + "%",
                height: 3,
                backgroundColor: "green"
              }}
            ></View>
            <View
              style={{
                width: wrongPercent + "%",
                height: 3,
                backgroundColor: "red"
              }}
            ></View>
            <View
              style={{
                width: 100 - wrongPercent - correctPercent + "%",
                height: 3,
                backgroundColor: "#1e88e5"
              }}
            ></View>
          </View>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text
              style={{
                width: correctPercent + "%",
                color: "green",
                textAlign: "center"
              }}
            >
              {correctPercent}%
            </Text>
            <Text
              style={{
                width: wrongPercent + "%",
                color: "red",
                textAlign: "center"
              }}
            >
              {wrongPercent}%
            </Text>
            <Text
              style={{
                width: 100 - wrongPercent - correctPercent + "%",
                color: "#1e88e5",
                textAlign: "center"
              }}
            >
              {100 - wrongPercent - correctPercent}%
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5
  },
  blank: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
