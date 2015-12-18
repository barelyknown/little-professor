import Ember from 'ember';

export default Ember.Controller.extend({
  levels: [1,2,3,4],

  isOn: null,

  level: null,

  mode: null,

  actions: {
    turnOn() {
      this.set('isOn', true);
      this.set('level', this.get('levels').objectAt(0));
      this.set('operator', '+');
      this.set('mode', 'settings');
    },

    turnOff() {
      this.set('isOn', false);
    },

    changeOperator(operator) {
      if (this.get('isOn') && this.get('mode') === 'settings') {
        this.set('operator', operator);
      }
    },

    playGame() {
      if (this.get('isOn') && this.get('mode') === 'settings') {
        this.set('mode', 'game');
      }
    },

    changeSettings() {
      if (this.get('isOn') && this.get('mode') === 'game') {
        this.set('mode', 'settings');
      }
    },

    nextLevel() {
      if (this.get('isOn') && this.get('mode') === 'settings') {
        const level = this.get('level');
        const levelIndex = this.get('levels').indexOf(level);
        const nextLevel = this.get('levels').objectAt(
          (levelIndex + 1) % this.get('levels').length
        );
        this.set('level', nextLevel);
      }
    }
  }
});
