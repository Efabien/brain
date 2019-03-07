const Brain = require('./index');

const degree = 2;//degree of acceptance for misspeling based on the edit distance

const scope = 3;//max of items checked for comparaison with the pseudo corpus

const knwlg = require('./resources/knowledge');

const knwlg2 = require('./resources/knowledge2');

const knwlg3 = require('./resources/knowledge3');

const brain = new Brain([knwlg2, knwlg, knwlg3], { degree, scope });

const input = 'quantité des vente sur le marché euro 2 1';

const analyse = brain.detect(input);
const keys = brain.extract(input, 'number');
console.log(analyse);
console.log(keys);