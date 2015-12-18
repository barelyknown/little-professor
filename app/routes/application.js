import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('isOn', false);
  },
  actions: {
    turnOn() {
      this.controllerFor('application').set('isOn', true);
      this.set('isOn', true);
    },
    turnOff() {
      this.controllerFor('application').set('isOn', false);
    }
  }
});
