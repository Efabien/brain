const brain = require('./brain');

module.exports = class Brain {
	constructor(knowledge, configs) {
		this._brain = brain;	
		this._knowledge = knowledge;
		this._degree = configs.degree;
		this._scope = configs.scope;

		this.feed();
	}

	feed() {
		this._brain.feed(
			this._knowledge.keyWords,
			this._knowledge.intents,
			this._scope,
			this._degree
		);
	}

	detect(input) {
		return this._brain.detect(input);
	}

	extract(input, what) {
		return this._brain.extract(input, what);
	}

	freeExtract(input) {
		return this._brain.extractAll(input);
	}
}
