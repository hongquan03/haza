
// Router HTTP / HTTPS
let mobile = require('is-mobile');
let bank   = require('./routes/bank');
module.exports = function(app, redT) {
	// Home
	app.get('/', function(req, res) {
		if (mobile({ua:req})){
			return res.redirect('/mobile/');
		} else {
			return res.redirect('/play/');
		}
	});
	app.get('/play/', function(req, res) {
		if (mobile({ua:req})){
			return res.redirect('/mobile/');
		} else {
			return res.render('index');
		}
	});
	app.get('/mobile/', function(req, res) {
		if (mobile({ua:req})){
			return res.render('index_mobile');
		} else {
			return res.redirect('/play/');
		}
	});

	// Android
	app.get('/download/android', function(req, res) {
		return res.render('download/android');
	});

	// Admin
	app.get('/68ClubA/', function(req, res) {
		return res.render('admin');
	});

	// Fanpage
	app.get('/fanpage/', function(req, res) {
		return require('./routes/fanpage/redirect')(res);
	});

	// Help IOS
	app.get('/help/ios/', function(req, res) {
		return res.render('help/ios');
	});

	//Telegram
	app.get('/telegram/', function(req, res) {
		return require('./routes/telegram/redirect')(res);
	});
	
	// thesieutoc callback
	app.get('/1ed926d2f8cf228c75cc370d25d28910/tst_callback', function(req, res) {
        return require('./app/Controllers/shop/nap_the_callback')(req,res);
    });


	// Bank
	app.get('/bank/', function(req, res) {
		bank(res, req.query);
	});

	// Sign API
	require('./routes/api')(app, redT);  // load routes API
};
