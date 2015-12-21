import Ember from 'ember';
const { isPresent } = Ember;

export default Ember.Component.extend({
  tagName: 'div',

  classNames: ['display'],

  termOne: null,

  termTwo: null,

  answer: null,

  level: null,

  operator: null,

  isEqualVisible: false,

  _pad(value, length) {
    return `  ${String(string)}`.slice(-length).split('').map((s) => {
      return isPresent(s.trim()) ? s : '';
    });
  },

  characters: Ember.computed('termOne', 'termTwo', 'level', 'operator', function() {
    let characters = [];

    if (isPresent(this.get('termOne'))) {
      characters = characters.concat(`  ${this.get('termOne').toString()}`.slice(-2).split(''));
    } else {
      characters = characters.concat(['','']);
    }
    if (isPresent(this.get('operator'))) {
      characters.pushObject(this.get('operator'));
    }
    if (isPresent(this.get('termTwo'))) {
      characters = characters.concat(this._pad(this.get('termTwo')));
    } else {
      characters = characters.concat(['','']);
    }
    if (this.get('displayEquals')) {
      characters.pushObject('=');
    } else {
      characters.pushObject(' ')
    }
    if (isPresent(this.get('level'))) {
      characters = characters.concat(['L','',this.get('level')]);
    } else {
      if (isPresent(this.get('answer'))) {
        characters = characters.concat(`  ${this.get('answer').toString()}`.slice(-2).split(''));
      } else {
        characters = characters.concat(['','']);
      }
    }

    return characters;
  })

});
