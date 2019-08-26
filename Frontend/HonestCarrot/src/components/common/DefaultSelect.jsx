import * as _ from "lodash";
import React from "react";
import { StyleSheet, View, Picker } from "react-native";

const DefaultSelect = props => (
  <View style={[styles.input, { flex: props.flex }]}>
    <Picker {...props} mode="dialog" style={[styles.picker, props.style]}>
      {props.items.map(({ value, label }, i) => (
        <Picker.Item key={i} value={value} label={label} />
      ))}
    </Picker>
  </View>
);

export default DefaultSelect;

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "#0553a6",
    padding: 0,
    paddingLeft: 0,
    marginBottom: 1
  },
  picker: {
    padding: 0,
    margin: 0,
    height: 30,
    flex: 1
  }
});
