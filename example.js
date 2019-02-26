const Brain = require('./index');

const degree = 2;//degree of acceptance for misspeling based on the edit distance

const scope = 3;//max of items checked for comparaison with the pseudo corpus

const knwlg = require('./resources/knowledge');

const knwlg2 = require('./resources/knowledge2');

const brain = new Brain([knwlg2, knwlg], { degree, scope });

const input = 'Give me the rate of the ether compared to the bitcoin euro';

const analyse = brain.detect(input);
console.log(analyse);