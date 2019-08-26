import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import Option from "../common/Option";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Spiner from "react-native-spinkit";

class Questions extends Component {
  state = { orientation: "column", questions: [], currentQuestion: 0 };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", () => this.getOrientation());
  }

  async componentDidMount() {
    const today = new Date().setHours(0, 0, 0, 0).toString();
    if ((await AsyncStorage.getItem("lastSubmit")) == today)
      return this.props.navigation.navigate("Result");

    if (await AsyncStorage.getItem("currentQuestion")) {
      this.setState({
        currentQuestion: parseInt(await AsyncStorage.getItem("currentQuestion"))
      });
    }

    let result = await axios.get("http://192.168.2.1:8000/questions");
    this.setState({ questions: result.data });
  }

  getOrientation = () => {
    let window = Dimensions.get("window");
    let isPortrait = window.width < window.height;
    this.setState({ orientation: isPortrait ? "column" : "row" });
  };

  submit = async selectedOption => {
    let { currentQuestion, questions } = this.state;
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        "http://192.168.2.1:8000/todayAnswers",
        { aid: selectedOption, question_id: currentQuestion + 1, token },
        { headers: { "Content-Type": "application/json" } }
      );

      currentQuestion++;
      if (currentQuestion >= questions.length) {
        const today = new Date().setHours(0, 0, 0, 0).toString();
        await AsyncStorage.setItem("lastSubmit", today);
        await AsyncStorage.removeItem("currentQuestion");
        this.props.navigation.navigate("Result");
      } else {
        this.setState({ currentQuestion });
        await AsyncStorage.setItem(
          "currentQuestion",
          currentQuestion.toString()
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    if (this.state.questions.length === 0)
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}
        >
          <Spiner size={75} color="#48addb" type="Wave" />
        </View>
      );
    return (
      <View
        style={{
          flex: 1,
          flexDirection: this.state.orientation
        }}
      >
        <Option
          onPress={() => this.submit(0)}
          style={{ backgroundColor: "#1e88e5" }}
          text={this.state.questions[this.state.currentQuestion].Q1}
        />
        <Option
          onPress={() => this.submit(1)}
          style={{ backgroundColor: "#d81b60" }}
          text={this.state.questions[this.state.currentQuestion].Q2}
        />
      </View>
    );
  }
}

export default Questions;
