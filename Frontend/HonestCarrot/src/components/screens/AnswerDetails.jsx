import React, { Component } from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import Background from "../../../assets/Login.jpg";
//TODO: fix the color for the pending questions
class AnswerDetails extends Component {
  render() {
    const item = this.props.navigation.getParam("item", null);
    const pending = this.props.navigation.getParam("pending", null);
    const color = pending ? "#1e88e5" : item.correct ? "green" : "red";

    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={Background}
      >
        <View style={styles.container}>
          <View style={styles.questionContainer}>
            <Text
              style={[
                styles.question,
                { color: item.aid == 0 ? color : "grey", marginBottom: 30 }
              ]}
            >
              {item.question.Q1}
            </Text>
            <Text
              style={[
                styles.question,
                { color: item.aid == 1 ? color : "grey" }
              ]}
            >
              {item.question.Q2}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>{item.created_at.split(" ")[0]}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default AnswerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 70
  },
  questionContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  question: {
    fontSize: 30
  },
  dateContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30
  },
  date: {
    backgroundColor: "rgb(113,67,103)",
    borderRadius: 5,
    padding: 5,
    width: "25%",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  }
});
