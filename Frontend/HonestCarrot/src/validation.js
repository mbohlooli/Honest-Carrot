export default (validate = (value, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        return isValid && isEmail(value);
      case "minLength":
        return isValid && minLength(value, rules[rule]);
      case "min":
        return isValid && min(value, rules[rule]);
      case "equals":
        return isValid && equals(value, connectedValue[rule]);
      default:
        break;
    }
  }
  return isValid;
});

isEmail = value =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );

minLength = (value, length) => value.length >= length;

min = (value, minValue) => value >= minValue;
equals = (value, equal) => value === equal;
