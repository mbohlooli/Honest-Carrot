import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  View,
  TouchableNativeFeedback
} from "react-native";

const Option = props => {
  if (Platform.OS == "android") {
    return (
      <TouchableNativeFeedback {...props}>
        <View style={[styles.question, props.style]}>
          <Text style={styles.questionText}>{props.text}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.question, props.style]}
      activeOpacity={0.8}
    >
      <Text style={styles.questionText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  question: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  questionText: {
    fontSize: 25
  }
});
