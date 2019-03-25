const brain = require('./brain');
const _ = require('lodash');
const vectors = require('./lib/vectors');

module.exports = class Brain {
  constructor(configs) {
    this._degree = configs.degree;
    this._scope = configs.scope;
  }

  _feed(brain, knowledges) {
    const dynamikBrain = brain();
    const resources = this._load(knowledges);
    dynamikBrain.feed(
      resources.keyWords,
      resources.intents,
      this._scope,
      this._degree
    );
    return dynamikBrain;
  }

  _load(knowledges) {
    return knowledges.reduce((item, result) => {
      result.keyWords = _.merge(result.keyWords, item.keyWords);
      result.intents = _.merge(result.intents, item.intents);
      return result;
    }, { keyWords: {}, intents: {} });
  }

  detect(input, knowledges) {
    const dynamikBrain = this._feed(brain, knowledges);
    const analyse = dynamikBrain.detect(input);
    const keyWords = dynamikBrain.extractAll(input);
    return { analyse, keyWords };
  }

  guess(input) {
    const analyse = this._brain.detect(input);
    const analyseVector = this._toVector(analyse);
    const scores = this.signatureVectors.map(vector => {
      const key = Object.keys(vector)[0];
      const value = vector[key];
      const diffs = vectors.substract([analyseVector, value]);
      const score = diffs.reduce((result, current, index, array) => {
        return array.slice(index + 1, array.length - 1).reduce((acc, item) => {
          return acc += Math.atan2(current, item);
        }, result);
      }, 0);
      return { [key]: score }
    });
    return scores;
  }

  extract(input, what) {
    return this._brain.extract(input, what);
  }

  extractAll(input) {
    return this._brain.extractAll(input);
  }

  freeExtract(input) {
    return this._brain.extractAll(input);
  }

  _generateSignatureVectors() {
    return this._brain.generateSignatureVectors();
  }

  _toVector(analyse) {
    return analyse.reduce((result, current) => {
      return Object.assign(result, { [current.intent]: current.score });
    }, {});
  }

  wordsWeigth() {
    return this._brain.getWeigths();
  }
}
