import { moduleFor, test } from 'ember-qunit';

moduleFor('model:problem-generator', 'Unit | problem generator', {
  unit: true
});

const operators = ['+','-','*','/'];
const levels = [1,2,3,4];

operators.forEach((operator) => {
  levels.forEach((level) => {
    test(`${operator} L ${level}`, function(assert) {
      var t = 0;
      while (t < 100) {
        const subject = this.subject();
        subject.setProperties({operator: operator, level: level});
        const problem = subject.generate();
        const terms = [problem.get('termOne'), problem.get('termTwo')];
        assert.ok(problem.get('termOne') >= subject.get('minTermOne'), `termOne is ${problem.get('termOne')}, minTermOne is ${subject.get('minTermOne')}. ${terms.join(',')}`);
        assert.ok(problem.get('termOne') <= subject.get('maxTermOne'), `termOne is ${problem.get('termOne')}, maxTermOne is ${subject.get('maxTermOne')}. ${terms.join(',')}`);
        assert.ok(problem.get('termTwo') >= subject.get('minTermTwo'), `termTwo is ${problem.get('termTwo')}, minTermTwo is ${subject.get('minTermTwo')}. ${terms.join(',')}`);
        assert.ok(problem.get('termTwo') <= subject.get('maxTermTwo'), `termTwo is ${problem.get('termTwo')}, maxTermTwo is ${subject.get('maxTermTwo')}. ${terms.join(',')}`);
        assert.ok(problem.get('answer') <= subject.get('maxAnswer'), `answer is ${problem.get('answer')}, max answer is ${subject.get('maxAnswer')}. ${terms.join(',')}`);
        assert.ok(problem.get('answer') >= subject.get('minAnswer'), `answer is ${problem.get('answer')}, min answer is ${subject.get('minAnswer')}. ${terms.join(',')}`);
        t += 1;
      }
    });
  });
});
