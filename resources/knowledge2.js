module.exports = {
	keyWords: {
		'currency': {
			'BTC': [['bitcoin']],
			'ETH': [['ethereum'], ['ether']],
			'EUR': [['euro'], ['eur'], ['l\'euro'], ['€'], ['Euro']],
			'MGA': [['ariary'], ['franc malgache'], ['Ar'], ['MGA'], ['mga'], ['Ariary'], ['AR']],
			'XOF': [['franc cfa'], ['cfa'], ['CFA'], ['XOF'], ['xof']]
		}
	},

	intents: {
		'askRate': {
			'texts': ['donne moi le cours du marché', 'quel est le cour sur le marché'],
			'pondered': ['rate', 'cours', 'marché']
		},
		'askRelativeRate': {
			'texts': ['Quel est le prix du par rapport au', 'combien vaut le comparé à'],
			'pondered': ['rapport']
		},
		'askTodaysSellsByMArket': {
			'texts': ['donne moi les quantités vendu sur le marché en', 'combien ont été vendu sur le marché de', 'donne moi le volume des vente sur le marché en'],
			'pondered': ['vendu', 'volume', 'ventes']
		},
		'askWeekAnalyse': {
			'texts': ['donne moi une analyse de la semaine', 'analyse du marché'],
			'pondered': ['semaine', 'analyse']
		}
	}
}