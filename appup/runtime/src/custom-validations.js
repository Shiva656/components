/**
 * @author dharma
 * For form fields validations we are using VeeValidate
 * In this file we will add all custom rules, which are then added to
 * VeeValidate object in main.js
 * To create a custom rule : https://baianat.github.io/vee-validate/guide/custom-rules.html
 */
var customRules = {
  rules: [],
  add: function (ruleName, rule) {
    this.rules.push({
      'ruleName': ruleName,
      'rule': rule
    });
  }
};


// This rule will check whether a given field content format is JSON or not
// customRules.add('json', {
//   getMessage: field => 'The ' + field + ' field must be a valid ' + field,
//   validate: value => {
//     try {
//       JSON.parse(value);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
// });

export default customRules;
