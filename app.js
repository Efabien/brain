var brain=require('./brain');
var degree=2;//degree of acceptance for misspeling based on the edit distance
var scope=3;//max of items checked for comparaison with the pseudo corpus
var knwlg=require('./knowledge');
brain.feed(knwlg.keyWords,knwlg.intents,scope,degree);
var input='salut quelle est le prix de l euro';
console.log(brain.detect(input));
console.log(brain.extract(input, 'money'));