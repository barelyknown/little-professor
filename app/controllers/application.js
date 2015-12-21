import Ember from 'ember';
import ProblemGenerator from 'little-professor/models/problem-generator';
const { isPresent } = Ember;

export default Ember.Controller.extend({
  levels: [1,2,3,4],

  digits: [0,1,2,3,4,5,6,7,8,9],

  isRetrying: Ember.computed.gt('tryCount', 0),

  problem: Ember.computed('problems', 'problemIndex', function() {
    if (isPresent(this.get('problems')) && isPresent(this.get('problemIndex'))) {
      return this.get('problems').objectAt(this.get('problemIndex'));
    }
  }),

  isComplete: Ember.computed('problems', 'problemIndex', function() {
    if (isPresent(this.get('problemIndex')) && isPresent(this.get('problems'))) {
      return this.get('problemIndex') >= this.get('problems').length;
    }
  }),

  isAnswerComplete: Ember.computed('answer', 'problem.answer', function() {
    if ((isPresent(this.get('answer'))) && (isPresent(this.get('problem.answer')))) {
      return this.get('answer').toString().length === this.get('problem.answer').toString().length;
    } else {
      return false;
    }
  }),

  isAnswerCorrect: Ember.computed('answer', 'problem.answer', function() {
    if ((this.get('answer') || this.get('answer') === 0) && (this.get('problem.answer') || this.get('problem.answer') === 0)) {
      return this.get('answer') === this.get('problem.answer');
    }
  }),

  wholeNumberDivisionTuples: Ember.computed(function() {
    const tuples = [];
    const max = 100;
    var numerator = 1;
    while (numerator <= max) {
      var denominator = 1;
      while (denominator <= max) {
        let answer = numerator / denominator;
        if (answer % denominator === 0) {
          tuples.pushObject([numerator, denominator]);
        }
        denominator += 1;
      }
      numerator += 1;
    }
    return tuples;
  }),

  actions: {
    turnOn() {
      if (!this.get('isOn')) {
        this.set('isOn', true);
        this.set('level', this.get('levels').objectAt(0));
        this.set('operator', '+');
        this.set('mode', 'settings');
      }
    },

    turnOff() {
      this.set('isOn', false);
    },

    changeOperator(operator) {
      if (this.get('isOn') && this.get('mode') === 'settings') {
        this.set('operator', operator);
      }
    },

    nextProblem() {
      this.set('answer', null);
      this.set('isAnswerLocked', false);
      this.set('isIncorrect', false);
      this.set('tryCount', 0);
      if (isPresent(this.get('problemIndex'))) {
        this.incrementProperty('problemIndex');
      } else {
        this.set('problemIndex', 0);
      }
    },

    go() {
      if (this.get('isOn') && this.get('mode') === 'settings') {
        this.set('mode', 'game');
        this.send('newGame');
      } else {
        if (this.get('isDisplayingAnswer')) {
          this.toggleProperty('isDisplayingAnswer');
          this.send('nextProblem');
        } else if (this.get('isComplete')) {
          this.send('newGame');
        }
      }
    },

    newGame() {
      this.set('problemIndex', null);
      this.set('correctAnswerCount', 0);
      this.set('isDisplayingAnswer', false);
      var problemCount = 0;
      const problems = [];
      const uniqueRandomIndexes = [];
      const t = this.get('wholeNumberDivisionTuples');
      while (uniqueRandomIndexes.length < 4) {
        const index = Math.floor(Math.random() * t.length);
        if (!uniqueRandomIndexes.contains(index)) {
          uniqueRandomIndexes.pushObject(index);
        }
      }
      while (problems.length < 4) {
        let termOne;
        let termTwo;
        switch (this.get('operator')) {
          case '/':
            termOne = t[uniqueRandomIndexes[problems.length]][0];
            termTwo = t[uniqueRandomIndexes[problems.length]][1];
            break;
        }
        const problemGenerator = ProblemGenerator.create({
          operator: this.get('operator'),
          level: this.get('level')
        });
        problems.pushObject(problemGenerator.generate());
      }
      this.set('problems', problems);
      this.send('nextProblem');
    },

    changeSettings() {
      if (this.get('isOn') && this.get('mode') === 'game') {
        this.set('mode', 'settings');
        this.set('problems', null);
        this.set('problemIndex', null);
        this.set('answer', null);
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
    },

    pressDigit(digit) {
      if (this.get('mode') === 'game' && !this.get('isAnswerLocked')) {
        var newAnswer;
        if (this.get('answer')) {
          newAnswer = parseInt(`${this.get('answer')}${digit}`);
        } else {
          newAnswer = digit;
        }
        this.set('answer', newAnswer);
        if (this.get('isAnswerComplete')) {
          this.set('isAnswerLocked', true);
          this.incrementProperty('tryCount');
          if (this.get('isAnswerCorrect')) {
            if (this.get('tryCount') === 1) {
              this.incrementProperty('correctAnswerCount');
            }
            this.set('tryCount', 0);
            Ember.run.later(this, function() {
              this.send('nextProblem');
            }, 500);
          } else {
            Ember.run.later(this, function() {
              this.set('isIncorrect', true);
              Ember.run.later(this, function() {
                this.set('isIncorrect', false);
                if (this.get('tryCount') === 3) {
                  this.set('answer', this.get('problem.answer'));
                  this.toggleProperty('isDisplayingAnswer');
                  this.set('isAnswerLocked', true);
                } else {
                  this.set('answer', null);
                  this.set('isAnswerLocked', false);
                }
              }, 1000);
            }, 500);
          }
        }
      }
    }
  }
});
