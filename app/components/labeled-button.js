import Ember from 'ember';

export default Ember.Component.extend({

  value: null,

  label: null,

  actions: {
    press() {
      this.get('onPress')(this.get('value'));
    }
  }
});
