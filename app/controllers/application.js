import Ember from 'ember';

export default Ember.Controller.extend({
  isOn: null,

  level: null,

  actions: {
    changeOperator(operator) {
      if (this.get('isOn')) {
        this.set('operator', operator);
      }
    }
  }
});
