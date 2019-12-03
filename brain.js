const strTool = require('./lib/strings');
const vectors = require('./lib/vectors');
const _ = require('lodash');

const brain = () => {
  let keyWords;
  let intents;
  let scope;
  let degree;
  let weigths;
  const SMALLEST = 0.0000000001;

  const _feed = (x, y, z, foo) => {
    keyWords = x;
    intents = strTool.preCompute(y);
    scope = z;
    degree = foo;
    weigths = _getWeigths();
  };

  const _depth = (what) => {
    let res = 0;
    let keys = [];
    for(var key in keyWords[what]){
      keys = keys.concat(keyWords[what][key]);
    }
    return keys.reduce((result, item) => {
      return item.length > result ? item.length : result;
    }, 0);
  };

  const _extract = (txt, what) => {
    const preselcted = [];
    const data = txt.split(' ');
    for(let key in keyWords[what]){
      keyWords[what][key].forEach((element) => {
        for(let i = 1; i <= _depth(what); i++){
          strTool.portionReading(data,i,function(array){
            if(strTool.exactMatch(element,array,degree)){
              preselcted.push(key);
            }
          });    
        }
      });
    }
    const hold = {};
    hold[what] = preselcted;
    return preselcted[0] ? hold : undefined;
  };

  const _extractAll = (text) => {
    return Object.keys(keyWords).map(index => {
      return _extract(text, index);
    });
  };

  const _detect =  (input) => {
    const data = input.split(' ');
    return Object.keys(intents).map(intent => {
      const candidate = { intent };
      const texts = intents[intent]['texts'];
      const result = texts.reduce((holder, element ) => { 
        for(let i = 1; i <= scope; i++) {
          strTool.portionReading(data, i, (array) => {
            strTool.portionReading(element, i, (proc) => {
              if (strTool.exactMatch(array, proc, degree)) {
                holder.matchs = holder.matchs.concat(array);
                const weigthsSums = array.reduce((sum, word) => {
                  return sum += _getWordWeigth(intent, word);
                }, 0);
                holder.score += (1 / (array.length * texts.length)) * weigthsSums;
              }
            })  
          });
        }
        return holder;
      }, { matchs: [], score: 0 });
      result.matchs = _.uniq(result.matchs);
      return _.merge(candidate, result);
    });
  };

  const _generateSignatureVectors = () => {
    const intentsKeys = Object.keys(intents);
    return intentsKeys.map((key, index) => {
      const text = intents[key]['texts'].reduce((acc, current) => {
        return acc.concat(current);
      }, []).join(' ');
      const scores = _detect(text).map(candidate => {
        return { [candidate.intent]: candidate.score };
      });
      return { [key]: scores.reduce((result, item) => {
        return Object.assign(result, item);
      }, {}) };
    });
  };

  const _getWeigths = () => {
    return Object.keys(intents).map(key => {
      const res = {};
      res.intent = key;
      res.weigths = intents[key].texts.map((sentence, index, texts) => {
        return sentence.map((word) => {
          return { word, weigth: _calculateWordWeigth(word, texts, intents) };
        }, {});
      }).reduce((res, item) => {
        return res = res.concat(item);
      }, []);
      return res;
    });
  };

  const _calculateWordWeigth = (word, texts, intents) => {
    const wordFrequency = texts.reduce((f, sentence) => {
      return f += sentence.filter(w => w === word).length;
    }, 0);
    const docFrequency = Object.keys(intents).reduce((number, key) => {
      const intent = intents[key];
      return number += intent.texts.reduce((occurence, sentence) => {
        if (occurence) return occurence;
        return occurence = sentence.some(token => token === word) ? 1 : 0;
      }, 0);
    }, 0);
    return wordFrequency * (1 / docFrequency);
  }

  const _getWordWeigth = (intent, word) => {
    const data = weigths.find(item => item.intent === intent);
    const result = data.weigths.find(item => { item.word === word }) || {};
    return result.weigth || SMALLEST;
  }

  return {
    feed: _feed,
    extract: _extract,
    extractAll: _extractAll,
    detect: _detect,
    generateSignatureVectors: _generateSignatureVectors,
    getWeigths: _getWeigths
  };
};
module.exports = brain;