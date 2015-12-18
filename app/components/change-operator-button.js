import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',

  operator: null,

  click() {
    this.get('onClick')(this.get('operator'));
  }
});
