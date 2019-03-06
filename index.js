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
}
