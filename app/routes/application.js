import Ember from 'ember';

export default Ember.Route.extend({
  levels: [1,2,3,4],

  setupController(controller) {
    controller.set('isOn', false);
  },

  actions: {
    turnOn() {
      const c = this.controllerFor('application');
      c.set('isOn', true);
      c.set('level', this.get('levels').objectAt(0));
      c.set('operator', '+');
    },
    turnOff() {
      const c = this.controllerFor('application');
      c.set('isOn', false);
    },
    nextLevel() {
      const c = this.controllerFor('application');
      if (c.get('isOn')) {
        const level = c.get('level');
        const levelIndex = this.get('levels').indexOf(level);
        const nextLevel = this.get('levels').objectAt(
          (levelIndex + 1) % this.get('levels').length
        );
        c.set('level', nextLevel);
      }
    }
  }
});
