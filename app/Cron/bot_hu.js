let angrybird  = require('./bot_hu/angrybird');
let bigbabol   = require('./bot_hu/bigbabol');
let candy      = require('./bot_hu/candy');
let longlan    = require('./bot_hu/longlan');
let zeus       = require('./bot_hu/zeus');
let minipoker  = require('./bot_hu/minipoker');
let vqred      = require('./bot_hu/vqred');

module.exports = function(io, listBot){
 	setTimeout(() =>{
		angrybird(io, listBot);
		minipoker(io, listBot);
		bigbabol(io, listBot);
	}, 5000);

	setTimeout(() =>{
		candy(io, listBot);
	}, 10000);

	setTimeout(() =>{
		vqred(io, listBot);
	}, 15000);

	setTimeout(() =>{
		longlan(io, listBot);
	}, 20000);

	setTimeout(() =>{
		zeus(io, listBot);
		listBot = null;
		io = null;
	}, 25000);
};