import Ember from 'ember';

export function formatOperator(params/*, hash*/) {
  var formatted;
  switch (params[0]) {
    case "+":
      formatted = "+";
      break;
    case "-":
      formatted = "-";
      break;
    case "*":
      formatted = "&times;";
      break;
    case "%":
      formatted = "&divide;";
      break;
  }
  return new Ember.Handlebars.SafeString(formatted);
}

export default Ember.Helper.helper(formatOperator);
