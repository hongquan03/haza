
/**
 * Mini Game
 */
// Mini Poker
let mini_poker = require('./game/mini_poker');

// Big Babol
let big_babol  = require('./game/big_babol');

// Bầu Cua
let baucua     = require('./game/baucua');

// Mini 3 Cây
let mini3cay   = require('./game/mini3cay');

// Cao Thấp
let caothap    = require('./game/caothap');

// AngryBirds
let angrybird  = require('./game/angrybird');

let megaj      = require('./game/megaj');

/**
 * Game
 */

// Bắn Cá
let fish    = require('./game/BanCa/index');

// Vương Quốc Red
let vq_red  = require('./game/vuong_quoc_red');

// Candy
let Candy   = require('./game/candy');

// Poker
let Poker   = require('./game/poker');

// 3 Cây
let BaCay   = require('./game/BaCay/index');

// Long Lân
let LongLan = require('./game/longlan');

//Zeus
let Zeus = require('./game/zeus');

//Lấy thông tin đại lý
let UserInfo = require('../Models/UserInfo');
let DaiLy = require('../Models/DaiLy');

// Reg game
let reg     = require('./game/reg');

// Xoc Xoc
let XocXoc  = require('./game/XocXoc');

// Xo So
let xs      = require('./game/xs');
//Lấy trạng thái User hiện tại
let userName = '';

module.exports = function(client, data){
	var selfClient = client;
	var selfData = data;
	UserInfo.findOne({'id':client.UID},function(err,user){
		if(!!user){
			DaiLy.findOne({'nickname':user.name},function(err,userDL){
						if (!!selfData.fish) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
						fish(selfClient, selfData.fish);
						}
						}
						if (!!selfData.mini_poker) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							mini_poker(selfClient, selfData.mini_poker);
						}
						}
						if (!!selfData.big_babol) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							big_babol(selfClient, selfData.big_babol);
						}
						}
						if (!!selfData.vq_red) {
							if(userDL){
								selfClient.red({
									VuongQuocRed:
										{status:0},
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game'
									}

							});
							}else{
							vq_red(selfClient, selfData.vq_red);
						}
						}
						if (!!selfData.baucua) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							} else{
							baucua(selfClient, selfData.baucua);
						}
						}
						if (!!selfData.mini3cay) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							mini3cay(selfClient, selfData.mini3cay);
						}
						}
						if (!!selfData.caothap) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							caothap(selfClient, selfData.caothap);
						}
						}
						if (!!selfData.angrybird) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							angrybird(selfClient, selfData.angrybird);
						}
						}
						if (!!selfData.megaj) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							megaj(selfClient, selfData.megaj);
						}
						}

						if (!!selfData.poker) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game'
									}
								});
							}else{
							Poker(selfClient, selfData.poker);
						}
						}

						if (!!selfData.bacay) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game'
									}
								});
							}else{
						BaCay(selfClient, selfData.bacay);
						}
						}

						if (!!selfData.candy) {
							if(userDL){
								selfClient.red({
									candy:
										{status:0},
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game'
									}

							});
							}else{
							Candy(selfClient, selfData.candy);
						}
						}

						if (!!selfData.longlan) {
							if(userDL){
								selfClient.red({
									longlan:
										{status:0},
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game'

								}});
							}else{
							LongLan(selfClient, selfData.longlan);
						}
						}
						if (!!selfData.zeus) {
							if(userDL){
								selfClient.red({Zeus:{status:0}, notice:{text:'Đại lý không được chơi game', title:'THẤT BẠI'}}
									);
							}else{
							Zeus(selfClient, selfData.zeus);
						}
						}
						if (!!selfData.reg) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							reg(selfClient, selfData.reg);
						}
						}
						if (!!selfData.xocxoc) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							XocXoc(selfClient, selfData.xocxoc);
						}
						}

						if (!!selfData.xs) {
							if(userDL){
								selfClient.red({
									notice: {
										title: 'Thông Báo',
										text: 'Đại lý không được chơi game',
										load: false
									}
								});
							}else{
							xs(selfClient, selfData.xs);
							}
						}

			})
		}
	})
	client = null;
	data = null;
}
