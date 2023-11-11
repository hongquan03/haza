
let Bank         = require('../../../Models/Bank/Bank');
let Bank_history = require('../../../Models/Bank/Bank_history');

let validator    = require('validator');

module.exports = function(client, data){
	if (!!data.bank && !!data.name) {
		let money    = data.money>>0;
		if (!validator.isLength(data.bank, {min: 3, max: 50})) {
			client.red({notice: {title:'LỖI', text: 'Ngân hàng không hợp lệ...'}});
		}else if (money < 50000) {
			client.red({notice: {title:'LỖI', text: 'Nạp tối thiểu 50.000'}});
		}else{
			Bank.findOne({number:data.bank}, '', function(err, bank){				
				Bank_history.create({uid:client.UID, bank:data.bank, hinhthuc:1, money:money, time:new Date()});
				client.red({notice: {title:'THÀNH CÔNG', text: 'Gửi yêu cầu nạp thành công...'}});
			});
		}
	}
}
