
let get_data = require('./HeThong/get_data');
let TXBot    = require('./HeThong/TXBot');
let BCBot    = require('./HeThong/BCBot');
let XXBot    = require('./HeThong/XXBot');
let clear    = require('./HeThong/clear');

let fanpage   = require('./HeThong/fanpage');
let telegram   = require('./HeThong/telegram');
let updateBot = require('./HeThong/updateBot');

module.exports = function(client, data) {
	if (void 0 !== data.txbot) {
		TXBot(client, data.txbot);
	}
	if (void 0 !== data.bcbot) {
		BCBot(client, data.bcbot);
	}
	if (void 0 !== data.xxbot) {
		XXBot(client, data.xxbot);
	}

	if (!!data.get_data){
		get_data(client);
	}
	if (!!data.clear){
		clear();
	}
	if (!!data.fanpage){
		fanpage(data.fanpage);
	}
	if (!!data.telegram){
		telegram(data.telegram);
	}
	if (!!data.updateBot){
		updateBot(client);
	}
}
