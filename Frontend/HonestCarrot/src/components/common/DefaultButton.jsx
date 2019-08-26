import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

const DefaultButton = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text style={[props.disabled ? styles.disabledText : styles.text]}>
        {props.title}
      </Text>
    </View>
  );

  if (props.disabled) return content;

  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

export default DefaultButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderColor: "#0553a6",
    borderWidth: 1
  },
  disabled: {
    backgroundColor: "#24529c",
    borderColor: "#aaa"
  },
  disabledText: {
    color: "#aaa"
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
});
