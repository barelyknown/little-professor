import DS from 'ember-data';

export default DS.Model.extend({
  termOne: null,
  termTwo: null,
  operator: null,

  isEvalable: Ember.computed('termOne', 'termTwo', 'operator', function() {
    return  (this.get('termOne') || this.get('termOne') === 0) &&
            (this.get('termTwo') || this.get('termTwo') === 0) &&
            this.get('operator');
  }),

  answer: Ember.computed('termOne', 'termTwo', 'operator', function() {
    if (this.get('isEvalable')) {
      return eval(`${this.get('termOne')} ${this.get('operator')} ${this.get('termTwo')}`);
    }
  })
});
