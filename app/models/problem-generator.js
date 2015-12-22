import Ember from 'ember';
import Problem from 'little-professor/models/problem';

export default Ember.Object.extend({
  operator: null,

  level: null,

  minTermOne: Ember.computed('operator', 'level', function() {
    switch (this.get('operator')) {
      case '+':
        switch (this.get('level')) {
          case 1:
            return 0;
          case 2:
            return 5;
          case 3:
            return 11;
          case 4:
            return 11;
          default:
            return 0;
        }
      case '-':
        return this.get('minAnswer') + this.get('minTermTwo');
      case '*':
        switch (this.get('level')) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 3:
            return 3;
          case 4:
            return 3;
        }
      default:
        return 0;
    }
  }),

  maxTermOne: Ember.computed('operator', 'level', function() {
    switch (this.get('operator')) {
      case '+':
        switch (this.get('level')) {
          case 1:
            return 5;
          case 2:
            return 10;
          case 3:
            return 25;
          case 4:
            return 51;
        }
      case '-':
        switch (this.get('level')) {
          case 1:
            return 9;
          case 2:
            return 20;
          case 3:
            return 50;
          case 4:
            return 99;
        }
      case '*':
        switch (this.get('level')) {
          case 1:
            return 5;
          case 2:
            return 9;
          case 3:
            return 12;
          case 4:
            return 19;
        }
      case '/':
        return this.get('minTermTwo') * this.get('maxAnswer');
    }
  }),

  minTermTwo: Ember.computed('operator', 'level', function() {
    switch (this.get('operator')) {
      case '*':
        return this.get('minTermOne');
        break;
      case '-':
        switch (this.get('level')) {
          case 3:
            return 11;
          case 4:
            return 11;
          default:
            return 0;
        }
      case '/':
        switch (this.get('level')) {
          case 1:
            return 1;
            break;
          case 2:
            return 2;
            break;
          case 3:
            return 3;
            break;
          case 4:
            return 11;
            break;
        }
      default:
        return 0;
    }
  }),

  maxTermTwo: Ember.computed('operator', 'level', function() {
    switch (this.get('operator')) {
      case '/':
        return this.get('maxTermOne') / this.get('minAnswer');
      default:
        return 99;
    }
  }),

  minAnswer: Ember.computed('operator', 'level', function() {
    switch (this.get('operator')) {
      case '+':
        switch (this.get('level')) {
          case 1:
            return 0;
          case 2:
            return 10;
          case 3:
            return 20;
          case 4:
            return 60;
        }
      case '-':
        switch (this.get('level')) {
          case 3:
            return 10;
          case 4:
            return 25;
          default:
            return 0;
        }
      case '*':
        return 1;
      case '/':
        switch (this.get('level')) {
          case 1:
            return 1;
            break;
          case 2:
            return 2;
            break;
          case 3:
            return 3;
            break;
          case 4:
            return 3;
            break;
        }
      default:
        return 0;
    }
  }),

  maxAnswer: Ember.computed('operator', 'level', function() {
    switch (this.get('operator')) {
      case '+':
        switch (this.get('level')) {
          case 1:
            return 9;
          case 2:
            return 20;
          case 3:
            return 50;
          case 4:
            return 99;
        }
      case '-':
        switch (this.get('level')) {
          case 1:
            return 9;
          case 2:
            return 9;
          case 3:
            return 20;
          case 4:
            return 80;
        }
      case '*':
        switch (this.get('level')) {
          case 1:
            return 10;
          case 2:
            return 20;
          case 3:
            return 50;
          case 4:
            return 99;
        }
      case '/':
        switch (this.get('level')) {
          case 1:
            return 3;
          case 2:
            return 9;
          case 3:
            return 20;
          case 4:
            return 9;
        };
    }
  }),

  _randomBetween(minimum, maximum) {
    return Math.floor(Math.random() * (maximum + 1 - minimum) + minimum);
  },

  generate() {
    let termOne;
    let termTwoCeiling;
    let termTwoFloor;
    let termTwo;

    termOne = this._randomBetween(this.get('minTermOne'), this.get('maxTermOne'));

    switch (this.get('operator')) {
      case '+':
        termTwoCeiling = this.get('maxAnswer') - termOne;
        termTwoFloor = Math.max(this.get('minAnswer') - termOne, 0);
        termTwo = this._randomBetween(termTwoFloor, termTwoCeiling);
        break;
      case '-':
        termTwoCeiling = Math.max(termOne - this.get('maxAnswer'), this.get('minTermTwo'));
        termTwoFloor = Math.max(termOne - this.get('minAnswer'), this.get('minTermTwo'));
        termTwo = this._randomBetween(termTwoFloor, termTwoCeiling);
        break;
      case '*':
        termTwoCeiling = Math.floor(this.get('maxAnswer') / termOne);
        termTwoFloor = Math.max(Math.ceil(this.get('minAnswer') / termOne), this.get('minTermTwo'));
        termTwo = this._randomBetween(termTwoFloor, termTwoCeiling);
        break;
      case '/':
        termTwoFloor = this.get('minTermTwo');
        termTwoCeiling = this.get('maxTermTwo');
        termTwo = this._randomBetween(termTwoFloor, termTwoCeiling);
        const termOnes = [];
        var m = this.get('minAnswer');
        while (m * termTwo <= this.get('maxTermOne')) {
          termOnes.pushObject(m * termTwo);
          m += 1;
        }
        termOne = termOnes[this._randomBetween(0, termOnes.length - 1)];
    }

    return Problem.create({
      operator: this.get('operator'),
      termOne: termOne,
      termTwo: termTwo
    });
  }
});
