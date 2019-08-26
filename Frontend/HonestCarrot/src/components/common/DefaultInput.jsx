import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
import * as _ from "lodash";

class DefaultInput extends Component {
  state = { touched: false, focused: false };

  render() {
    return (
      <TextInput
        {..._.omit(this.props, "marginBottom")}
        style={[
          styles.input,
          this.props.style,
          {
            borderColor:
              !this.props.valid && this.state.touched && !this.state.focused
                ? "red"
                : "#0553a6",
            marginBottom: this.props.marginBottom == 0 ? 0 : 1
          }
        ]}
        onFocus={() => this.setState({ touched: true, focused: true })}
        onBlur={() => this.setState({ focused: false })}
      />
    );
  }
}

export default DefaultInput;

const styles = StyleSheet.create({
  input: {
    padding: 8,
    paddingLeft: 10,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff"
  }
});
