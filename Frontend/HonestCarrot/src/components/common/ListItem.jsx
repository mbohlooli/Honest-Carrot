import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableNativeFeedback
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ListItem = props =>
  Platform.OS == "android" ? (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.date}>{props.item.created_at.split(" ")[0]}</Text>
        <Text style={styles.answer}>
          {props.item.aid ? props.item.question.Q2 : props.item.question.Q2}
        </Text>
        <View style={{ width: "20%" }}>
          <Icon size={30} color={props.color} name={props.name} />
        </View>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={props.onPress}
    >
      <Text style={styles.date}>{props.item.created_at.split(" ")[0]}</Text>
      <Text style={styles.answer}>
        {props.item.aid ? props.item.question.Q2 : props.item.question.Q2}
      </Text>
      <View style={{ width: "20%" }}>
        <Icon size={30} color={props.color} name={props.name} />
      </View>
    </TouchableOpacity>
  );

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  date: {
    backgroundColor: "rgb(113,67,103)",
    borderRadius: 5,
    padding: 5,
    width: "25%",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  answer: {
    padding: 5,
    width: "55%",
    marginLeft: 20,
    marginRight: 10
  }
});
