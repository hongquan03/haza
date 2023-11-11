
let list = require('./bank/list');
let rut  = require('./bank/rut');
let nap  = require('./bank/nap');
let atm  = require('./bank/atm');

module.exports = function(client, data){
	if (!!data.list) {
		list(client);
	}
	if (!!data.rut) {
		rut(client, data.rut);
	}
	if (!!data.atm) {
		atm(client, data.atm);
	}
	if (!!data.nap) {
		nap(client, data.nap);
	}
}
