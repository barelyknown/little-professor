import Ember from 'ember';
const { isPresent } = Ember;

export function formatTerm(params) {
  const term = params[0];
  let formatted;
  const characters = ['',''];

  if (isPresent(term)) {
    const termCharacters = String(term).split('');
    termCharacters.reverse().forEach((character, index) => {
      characters[characters.length - index - 1] = character;
    });
  }

  return new Ember.Handlebars.SafeString(characters.map((c) => {
    return `<span class='display-character'>${c}</span>`;
  }).join(''));
}

export default Ember.Helper.helper(formatTerm);
