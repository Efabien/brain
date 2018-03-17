const brain = require('./brain');
const degree = 2;//degree of acceptance for misspeling based on the edit distance
const scope = 3;//max of items checked for comparaison with the pseudo corpus
const knwlg = require('./knowledge');

const knwlg2 = require('./knowledge2');

brain.feed(knwlg2.keyWords, knwlg2.intents, scope, degree);

const input = 'Give me the rate of the ether compared to the bitcoin';
console.log(brain.detect(input));
console.log(brain.extract(input, 'currency'));