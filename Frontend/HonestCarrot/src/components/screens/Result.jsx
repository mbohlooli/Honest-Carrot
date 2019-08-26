import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import React, { Component } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Spiner from "react-native-spinkit";
import Background from "../../../assets/Login.jpg";
import ListItem from "../common/ListItem";

class Result extends Component {
  state = { data: [] };

  async componentDidMount() {
    try {
      let data = (await axios.get(
        "http://192.168.2.1:8000/answers?token=" +
          (await AsyncStorage.getItem("token"))
      )).data;
      this.setState({ data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.data.length === 0)
      return (
        <View style={styles.blank}>
          <Spiner size={75} color="#48addb" type="Wave" />
        </View>
      );

    return (
      <ImageBackground
        source={Background}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <ScrollView>
            <View>
              <Text style={styles.today}>Today</Text>
              <FlatList
                style={styles.ListContainer}
                data={this.state.data[0]}
                renderItem={({ item }) => (
                  <ListItem
                    item={item}
                    color="#1e88e5"
                    onPress={() =>
                      this.props.navigation.push("AnswerDetails", {
                        item,
                        pending: true
                      })
                    }
                    name="md-help"
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
            <View>
              <FlatList
                style={styles.ListContainer}
                data={this.state.data[1]}
                renderItem={({ item }) => (
                  <ListItem
                    item={item}
                    color={item.correct ? "green" : "red"}
                    onPress={() =>
                      this.props.navigation.push("AnswerDetails", { item })
                    }
                    name={item.correct ? "md-checkmark" : "md-close"}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default Result;
const styles = StyleSheet.create({
  ListContainer: {
    width: "100%",
    padding: 10
  },
  today: {
    margin: 20,
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: "#ee7600",
    borderRadius: 5,
    width: 55,
    padding: 6,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15
  },
  blank: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
